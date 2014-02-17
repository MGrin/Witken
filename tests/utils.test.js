var should = require('should');
var utils = process.env.APP_COV ? require(__dirname + '/../cov/utils.js') : require(__dirname + '/../witken/utils.js');

var NB_EXPORTS_OBJECTS = 7;
describe('Utils', function() {
    it('should have a generateInputError function', function() {
        utils.should.have.property('generateInputError');
    });
    it('should have a generateDatabaseError function', function() {
        utils.should.have.property('generateDatabaseError');
    });
    it('should have a generateServerError function', function() {
        utils.should.have.property('generateServerError');
    });
    it('should have a generateRoutingError function', function() {
        utils.should.have.property('generateRoutingError');
    });
    it('should have a generateHackingError', function() {
        utils.should.have.property('generateHackingError');
    });
    it('should have a generateNotImplementedYetError function', function() {
        utils.should.have.property('generateNotImplementedYetError');
    });
    it('should have a generateConfirmationLink function', function() {
        utils.should.have.property('generateConfirmationLink');
    });


    it('should cover all exports functions', function() {
        var counter = 0;
        for (var key in utils) {
            counter++;
        }
        counter.should.be.equal(NB_EXPORTS_OBJECTS);
    });
});