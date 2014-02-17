var should = require('should');
var email = process.env.APP_COV ? require(__dirname + '/../cov/email.js') : require(__dirname + '/../witken/email.js');

var NB_EXPORTS_OBJECTS = 3;

describe('Email', function() {
    it('should have a valid init function', function() {
        email.should.have.property('init');
    });
    it('should have a sendInscriptionConfirmation function', function() {
        email.should.have.property('sendInscriptionConfirmation');
    });
    it('should have an addAttachement function', function() {
        email.should.have.property('addAttachement');
    });

    it('should cover all exports functions', function() {
        var counter = 0;
        for (var key in email) {
            counter++;
        }
        counter.should.be.equal(NB_EXPORTS_OBJECTS);
    });
});