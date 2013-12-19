var User = require('./user.js');

var Eventbrite = require('eventbrite');
var eb_client = Eventbrite({
    'app_key': "YJSBEX5NJKKTMRAH5J",
    'user_key': "138684355683422048593"
});

exports.init = function () {
    exports.updateEventsData(function () {

    });
}

exports.ORGANIZATION = "MGSDD";
exports.ORGANIZATION_ID = 5669656715;

exports.MAX_NUMBER_OF_PARTICIPANTS = 150;

var events = [];

exports.updateEventsData = function (callback) {
    eb_client.organizer_list_events({
        id: exports.ORGANIZATION_ID
    }, function (err, data) {
        if (err) {
            return console.log('Error while retrieving events from eventbrite: ' + err);
        }

        for (var i = 0; i < data.events.length; i++) {
            var e = data.events[i].event;
            var tickets = [];
            for (var j = 0; j < e.tickets.length; j++) {
                var t = e.tickets[j].ticket;
                tickets.push({
                    quantity_sold: t.quantity_sold,
                    currency: t.currency,
                    quantity_available: t.quantity_available,
                    price: t.price
                });
            }
            var event = {
                id: e.id,
                start_date: e.start_date,
                end_date: e.end_date,
                venue: {
                    city: e.venue.city,
                    country: e.venue.country,
                    id: e.venue.id
                },
                tickets: tickets,
                url: e.url
            };
            events.push(event);
        }

        callback();
    });
}

exports.confirmOrder = function (eventID, orderID, callback) {
    console.log('Confirming order ' + eventID + ' ' + orderID);
    if (!eventID || !orderID) {
        return callback('Faild to confirm your order. Please send us an email with this data: eid=' + eventID + ' oid=' + orderID);
    }

    eb_client.event_list_attendees({
        id: eventID,
        count: exports.MAX_NUMBER_OF_PARTICIPANTS,
    }, function (err, data) {
        if (err) {
            console.log('Error from eventbrite: ' + JSON.stringify(err));
            return callback('Error from eventbrite: ' + JSON.stringify(err));
        }
        var attendees = data.attendees;
        var user;

        for (var i = 0; i < attendees.length; i++) {
            if (attendees[i].attendee.order_id === parseInt(orderID)) {
                user = attendees[i].attendee;
                break;
            }
        }
        
        if (!user) {
            console.log('Error while verifing order');
            return callback('Error while verifing order');
        }
        User.confirmOrder(user, function (err, user) {
            if (err) {
                console.log('Error from userDB: ' + err);
                return callback('Error from userDB: ' + err);
            }
            return callback(null, user);
        });
    });
}

exports.getValidEvents = function (callback) {
    exports.updateEventsData(function () {
        callback(events);
    });
}