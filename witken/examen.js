var eventbrite;
var utils;
var user;
var examen_db;

var mongoose = require('mongoose');

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

    db.on('error', function() {
        return error_callback('Failed to connect to Examen DB');
    });
    db.once('open', success_callback);
    updateExamensList(function() {});
    setInterval(updateExamensList, 1000 * 60 * 60 * 12);
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
    eb_id: Number
});

examenSchema.methods.addAttendee = function(attendee, callback) {
    var ex = this;
    user.User.findOne({
        email: attendee.email
    }, function(err, us) {
        if (err) {
            return callback(err);
        }
        if (!us) {
            return callback(utils.generateServerError('warning', 'No user found!'));
        }
        if (ex.attendees) {
            for (var i = 0; i < ex.attendees.length; i++) {
                if (ex.attendees[i].email === attendee.email) {
                    return callback(utils.generateServerError('warning', 'User ' + attendee.email + ' already registered for this examen'));
                }
            }
        } else {
            ex.attendees = [];
        }
        ex.attendees.push(us);
        ex.save();
        return callback(null, this);
    });
}
examenSchema.methods.generateShortObject = function() {
    return {
        date: this.date,
        venue: this.venue,
        url: this.url,
        tickets: this.tickets,
        eb_id: Number
    };
}

examenSchema.methods.addSuperviser = function(superviser, callback) {
    if (this.supervisors.indexOf(superviser) === -1) {
        this.supervisors.push(superviser);
        this.save();
    }
    return callback();
}

var Examen = mongoose.model('Examen', examenSchema, 'examens');

var updateExamensList = function(callback) {
    eventbrite.getEventsList(function(err, events) {
        if (err) {
            return callback(err);
        }
        events.forEach(function(event) {
            getExamenFromEventbrite(event, function() {});
        });
    });
}

var getValidExamensList = function(callback) {
    Examen.find({
        date: {
            $gt: new Date()
        }
    }, function(err, exs) {
        if (err) {
            return callback(utils.generateDatabaseError('Examen', err));
        }
        return callback(null, exs);
    })
}

var getExamenFromEventbrite = function(eb_exam, callback) {
    Examen.findOne({
        eb_id: eb_exam.id
    }, function(err, ex) {
        if (err) {
            return callback(utils.generateDatabaseError('Examen', err));
        }

        if (!ex) {
            eventbrite.getAttendeesList(eb_exam.id, function(err, attendees) {
                if (err) {
                    return callback(err);
                }
                var emailList = [];
                for (var i = 0; i < attendees.length; i++) {
                    emailList.push(attendees[i].email);
                }
                var query = {
                    email: {
                        $in: emailList
                    }
                };
                user.User.find(query, function(err, uss) {
                    if (err) {
                        return callback(utils.generateDatabaseError('User', err));
                    }
                    if (!uss) {
                        return callback(utils.generateDatabaseError('User', 'No users found'));
                    }
                    var attendeeList = [];
                    for (var i = 0; i < uss.length; i++) {
                        attendeeList.push(uss[i].generateShortObject());
                    }
                    ex = new Examen({
                        date: eb_exam.start_date,
                        venue: eb_exam.venue,
                        tickets: eb_exam.tickets,
                        attendees: attendeeList,
                        eb_id: eb_exam.id,
                        url: eb_exam.url
                    });
                    ex.save();
                    return callback(null, ex);
                });
            });
        } else {
            return callback(null, ex);
        }
    });
}

exports.init = init;
exports.updateExamensList = updateExamensList;
exports.getValidExamensList = getValidExamensList;
exports.Examen = Examen;
exports.getExamenFromEventbrite = getExamenFromEventbrite;