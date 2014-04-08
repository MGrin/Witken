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
            return callback(utils.generateDatabaseError('Eventbrite', err));
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
            return callback(utils.generateDatabaseError('Eventbrite', err));
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
    var eb_user; //get User Data From Eventbrite
    var eb_examen; //get Event Data From Eventbrite

    getEvent(eventID, function(err, event) {
        if (err) {
            return callback(utils.generateDatabaseError('Eventbrite', err));
        }
        if (!event) {
            return callback(utils.generateServerError('fatal', 'No event found, please contact us'));
        }
        eb_examen = event;
        getAttendeesList(eventID, function(err, attendees) {
            if (err) {
                return callback(err);
            }
            for (var i = 0; i < attendees.length; i++) {
                if (attendees[i].order_id === parseInt(orderID)) {
                    eb_user = attendees[i];
                    break;
                }
            }
            if (!eb_user) {
                return callback(utils.generateServerError('fatal', 'No order found, please contact us'));
            }

            //TODO
            throw new Exception('Failed');
            // user.getUserFromEventbrite(eb_user, function(err, us) {
            //     if (err) {
            //         return callback(err);
            //     }
            //     examen.getExamenFromEventbrite(eb_examen, function(err, ex) {
            //         if (err) {
            //             return callback(err);
            //         }
            //         us.addExamen(ex.generateShortObject());
            //         ex.addAttendee(us, function(err, exam) {
            //             if (err) {
            //                 return callback(err);
            //             } else {
            //                 return callback(null, us);
            //             }
            //         });
            //     });
            // });
        });
    });
}

exports.init = init;
exports.getEventsList = getEventsList;
exports.getEvent = getEvent;
exports.getAttendeesList = getAttendeesList;
exports.confirmOrder = confirmOrder;