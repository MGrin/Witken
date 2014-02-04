var User = require('./user.js');
var utils = process.env.APP_COV ? require(__dirname + '/../cov/utils.js') : require(__dirname + '/utils.js');

var Eventbrite = require('eventbrite');
var eb_client = Eventbrite({
    'app_key': "YJSBEX5NJKKTMRAH5J",
    'user_key': "138684355683422048593"
});

exports.init = function () {
    exports.updateEventsData(function () {});
    setInterval(function(){
        exports.updateEventsData(function () {});
    }, 1000*60*60*12);
}

exports.ORGANIZATION = "MGSDD";
exports.ORGANIZATION_ID = 5669656715;

exports.MAX_NUMBER_OF_PARTICIPANTS = 100;

var events = [];

exports.updateEventsData = function (callback) {
    eb_client.organizer_list_events({
        id: exports.ORGANIZATION_ID
    }, function (err, data) {
        if (err) {
            //console.log('Error while retrieving events from eventbrite: ' + err);
            return callback(utils.generateDatabaseError('Eventbrite', err));
        }
        events = [];
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

        callback(null, events);
    });
}

exports.confirmOrder = function (eventID, orderID, callback) {
    if (!eventID || !orderID) {
        return callback(utils.generateRoutingError('Order confirmation', 'fatal', 'Faild to confirm your order. Please contact us. Sorry for that.'));
    }

    eb_client.event_list_attendees({
        id: eventID,
        count: exports.MAX_NUMBER_OF_PARTICIPANTS,
    }, function (err, data) {
        if (err) {
            return callback(utils.generateDatabaseError('Eventbrite', err));
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
            return callback(utils.generateDatabaseError('Eventbrite', 'Failed to verify order, please contact us. Sorry for that.'));
        }
        User.confirmOrder(user, eventID, orderID, function (err, user) {
            return callback(err, user);
        });
    });
}

exports.getValidEvents = function (callback) {
    callback(events);
}

exports.getAttendees = function (eventID, callback) {
    eb_client.event_list_attendees({
        id: eventID,
        count: exports.MAX_NUMBER_OF_PARTICIPANTS,
    }, function (err, data) {
        if (err) {
            return callback('Error from eventbrite: ' + JSON.stringify(err));
        }
        var attendees = data.attendees;
        var res = [];
        var user;

        for (var i = 0; i < attendees.length; i++) {
            res.push(attendees[i].attendee);
        }

        callback(null, res);
    });
}