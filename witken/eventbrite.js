var Eventbrite = require('eventbrite');
var utils;
var examen;
var user;
var ORGANIZATION;
var ORGANIZATION_ID;

var eb_client;

var init = function(_utils, _examen, _user, _organization, _organization_ID) {
    utils = _utils;
    examen = _examen;
    user = _user;
    ORGANIZATION = _organization;
    ORGANIZATION_ID = _organization_ID;

    eb_client = Eventbrite({
        'app_key': "YJSBEX5NJKKTMRAH5J",
        'user_key': "138684355683422048593"
    });
}

var MAX_NUMBER_OF_PARTICIPANTS = 100;

var getEventsList = function(callback) {
    eb_client.organizer_list_events({
        id: parseInt(ORGANIZATION_ID)
    }, function(err, data) {
        if (err) {
            return callback(new utils.DatabaseError('Eventbrite', err));
        }
        var events = [];

        for (var i = 0; i < data.events.length; i++) {
            events.push(data.events[i].event);
        }

        callback(null, events);
    });
}

var getEvent = function(id, callback) {
    eb_client.event_get({
        id: parseInt(id)
    }, function(err, data) {
        return callback(err, data.event);
    });
}

var getAttendeesList = function(eventID, callback) {
    eb_client.event_list_attendees({
        id: parseInt(eventID)
    }, function(err, data) {
        if (err) {
            return callback(new utils.DatabaseError('Eventbrite', err));
        }
        var attendees = data.attendees;
        var res = [];

        for (var i = 0; i < attendees.length; i++) {
            res.push(attendees[i].attendee);
        }

        callback(null, res);
    });
}

var confirmOrder = function(eventID, orderID, callback) {
    examen.Examen.findOne({eb_id: eventID}, function(err, exam){
        if(err) return callback(new utils.DatabaseError('Examen', err));

        var findOrderID = function (examen, attendees) {
            for (var i in attendees){
                if(attendees[i].orderID === parseInt(orderID)){
                    return callback(null, attendees[i],user);
                }
            }
            return callback(new utils.DatabaseError('Eventbrite', 'Could not find your order, please contact us: eid='+eventID+' oid'+orderID));
        }

        if(!exam){
            var eb_examen;
            getEvent(eventID, function(err, event){
                if(err) return callback(new utils.DatabaseError('Eventbrite', err));
                if(!event) return callback(new utils.ServerError('No event found, please contact us: eid='+eventID+' oid'+orderID));

                eb_examen = event;
                examen.extractFromEventbrite(eb_examen, function (err, examen) {
                    if(err) return callback(err);
                    findOrderID(examen);
                });
            });
        }else{
            getAttendeesList(eventID, function(err, attendees){
                if(err) return callback(err);
                findOrderID(examen, attendees);
            });
        }
    });
}

exports.init = init;
exports.getEventsList = getEventsList;
exports.getEvent = getEvent;
exports.getAttendeesList = getAttendeesList;
exports.confirmOrder = confirmOrder;