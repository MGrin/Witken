var should = require('should');
var events = process.env.APP_COV ? require(__dirname + '/../cov/eventbrite.js') : require(__dirname + '/../witken/eventbrite.js');

describe('Eventbrite', function () {
    it('should have an updateEventsData function', function () {
        events.should.have.property('updateEventsData');
    });

    it('should have an init function', function () {
        events.should.have.property('init');
    });

    it('should have an confirmation order function', function () {
        events.should.have.property('confirmOrder');
    });

    it('should have an getValidEvents function', function () {
        events.should.have.property('getValidEvents');
    });

    it('should have an getAttendees function', function () {
        events.should.have.property('getAttendees');
    });

    events.init();
    var currentEvents;

    describe('Eventbrite.updateEventsData', function () {
        it('should return an events list', function (done) {
            events.updateEventsData(function (err, ev) {
                should.not.exist(err);
                should.exist(ev);
                (ev.length > 0).should.be.equal(true);

                currentEvents = ev;

                done();
            });
        });
    });

    describe('Eventbrite.getValidEvents', function () {
        it('should return a valid event list', function (done) {
            events.getValidEvents(function (ev) {
                if (!currentEvents) {
                    currentEvents = ev;
                    should.exist(currentEvents);
                }
                ev.should.be.equal(currentEvents);
                done();
            })
        });
    });

    describe('Eventbrite.getAttendees', function () {
        it('should return a valid list of attendees', function (done) {

            if (currentEvents.length === 0) {
                currentEvents.should.not.be.empty
            } else {
                events.getAttendees(currentEvents[0].id, function (err, att) {
                    should.not.exist(err);
                    should.exist(att);
                    currentEvents[0].attendees = att;
                    done();
                });
            }
        });
    });

    describe('Eventbrite.confirmOrder', function () {
        it('should not confirm an undifined order', function () {
            events.confirmOrder(undefined, undefined, function (err, us) {
                should.exist(err);
                should.not.exist(us);
            });
        });

        it('should not confirm an order with false eventID', function (done) {
            events.confirmOrder(-1, -1, function (err, us) {
                should.exist(err);
                should.not.exist(us);
                done();
            });
        });

        it('should not confirm an order with false orderID', function (done) {
            if (currentEvents.length === 0) {
                currentEvents.should.not.be.empty
            } else {
                var eventID = currentEvents[0].id;
                events.confirmOrder(eventID, -1, function (err, us) {
                    should.exist(err);
                    should.not.exist(us);
                    done();
                });
            }
        });

        it('should confirm a good order', function (done) {
            if (currentEvents.length === 0) {
                currentEvents.should.not.be.empty
            } else {
                var eventID = currentEvents[0].id;
                var orderID = currentEvents[0].attendees[0].order_id;

                events.confirmOrder(eventID, orderID, function (err, us) {
                    should.not.exist(err);
                    should.exist(us);
                    done();
                });
            }
        });
    });
});