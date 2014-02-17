var should = require('should');
var auth = process.env.APP_COV ? require(__dirname + '/../cov/authentication.js') : require(__dirname + '/../witken/authentication.js');

var NB_EXPORTS_OBJECTS = 4;

describe('Authentication', function() {
    it('should have a valid init function', function() {
        auth.should.have.property('init');
    });
    it('should have a passport object', function() {
        auth.should.have.property('passport');
    });
    it('should have an authentication function', function() {
        auth.should.have.property('authenticate');
    });
    it('should have an sugnup function', function() {
        auth.should.have.property('signup');
    });

    it('should cover all exports functions', function() {
        var counter = 0;
        for (var key in auth) {
            counter++;
        }
        counter.should.be.equal(NB_EXPORTS_OBJECTS);
    });
});