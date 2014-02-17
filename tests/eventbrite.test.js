var should = require('should');
var eventbrite = process.env.APP_COV ? require(__dirname + '/../cov/eventbrite.js') : require(__dirname + '/../witken/eventbrite.js');

var NB_EXPORTS_OBJECTS = 5;
var event1ID = 10136525621;

describe('Eventbrite', function() {
    it('should have a valid init function', function() {
        eventbrite.should.have.property('init');
    });

    it('should have a getEventsList function', function() {
        eventbrite.should.have.property('getEventsList');
    });
    it('should have a getEvent function', function() {
        eventbrite.should.have.property('getEvent');
    });
    it('should have a getAttendeesList function', function() {
        eventbrite.should.have.property('getAttendeesList');
    });
    it('should have a confirmOrder function', function() {
        eventbrite.should.have.property('confirmOrder');
    });

    it('should cover all exports functions', function() {
        var counter = 0;
        for (var key in eventbrite) {
            counter++;
        }
        counter.should.be.equal(NB_EXPORTS_OBJECTS);
    });
});