var eventbrite;
var utils;
var user;
var examen_db;

var mongoose = require('mongoose');

var MIN_NUMBER_ATTENDEES = 5;

var init = function(_eventbrite, _utils, _user, _db, error_callback, success_callback) {
    if (!_eventbrite || !_utils || !_user || !_db || !error_callback || !success_callback) {
        throw 'Wrong arguments exception!';
        return;
    }
    eventbrite = _eventbrite;
    utils = _utils;
    user = _user;
    examen_db = _db;

    mongoose.connect(examen_db);
    var db = mongoose.connection;

    db.on('error', error_callback);
    db.once('open', success_callback);

    setInterval(updateExamsInDB, 1000*60*60*6);
    updateExamsInDB();
}

var examenSchema = mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    venue: Object,
    url: String,
    tickets: Object,
    attendees: {
        type: Array,
        default: []
    },
    supervisors: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: false
    },
    eb_id: Number
});

examenSchema.methods.replaceAttendeesArrayBy = function (attendees, cb) {
    var thatExam = this;
    var emailList = [];
    for (var i = 0; i < attendees.length; i++) {
        emailList.push(attendees[i].email);
    }

    var findAttendeeByEmail = function(email, attendees){
        for (var i = 0; i < attendees.length; i++) {
            if(attendees[i].email === email) return attendees[i];
        }
        return null;
    }

    var query = {
        email: {
            $in: emailList
        }
    };

    user.User.find(query, function(err, uss) {
        if (err) {
            return callback(new utils.DatabaseError('User', err));
        }
        if (!uss) {
            return callback(new utils.DatabaseError('User', 'No users found'));
        }

        var attendeeList = [];
        for (var i = 0; i < uss.length; i++) {
            var attendee = findAttendeeByEmail(uss[i].email, attendees);
            if(attendee){
                attendeeList.push({
                    orderID: attendee.order_id,
                    user: uss[i]._id
                });
            }else{
                return callback(new utils.ServerError('Failed to get attendee by email: '+uss[i].email));
            }
        }

        thatExam.attendees = attendeeList;
        if(thatExam.attendees.length >= MIN_NUMBER_ATTENDEES) {
            thatExam.status = true;
        }
        thatExam.save(cb);
    });
}

examenSchema.methods.generatePublicObject = function () {
    return {
        date: this.date,
        venue: this.venue,
        url: this.url,
        tickets: this.tickets,
        attendeesNb: this.attendees.length,
        supervisors: this.supervisors,
        status: this.status,
        eb_id: this.eb_id
    }
}
var Examen = mongoose.model('Examen', examenSchema, 'examens');

var getValidExamensList = function(callback) {
    Examen.find({
        date: {
            $gt: new Date()
        }
    }, function(err, exs) {
        if (err) {
            return callback(new utils.DatabaseError('Examen', err));
        }
        return callback(null, exs);
    })
}

var extractFromEventbrite = function(eb_exam, callback) {
    eventbrite.getAttendeesList(eb_exam.id, function(err, attendees) {
        var ex = new Examen({
            date: eb_exam.start_date,
            venue: eb_exam.venue,
            tickets: eb_exam.tickets,
            attendees: [],
            eb_id: eb_exam.id,
            url: eb_exam.url
        });

        if (err){
            ex.save();
            return callback(null, ex);
        }

        ex.replaceAttendeesArrayBy(attendees, callback);
    });
}

var updateExamsInDB = function (cb) {
    eventbrite.getEventsList(function (err, events) {
        if(err && cb) return cb(err);
        for(var i = 0; i < events.length; i ++ ){
            extractFromEventbrite(events[i], function(){});
        }
        if(cb) cb();
    });
}
exports.init = init;
exports.getValidExamensList = getValidExamensList;
exports.Examen = Examen;
exports.extractFromEventbrite = extractFromEventbrite;