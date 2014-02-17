var should = require('should');
var routes = process.env.APP_COV ? require(__dirname + '/../cov/routes.js') : require(__dirname + '/../witken/routes.js');

var NB_EXPORTS_OBJECTS = 9;

describe('Routes', function() {
    it('should have a valid init function', function() {
        routes.should.have.property('init');
    });

    it('should have a route to the index page', function() {
        routes.should.have.property('index');
    });

    it('should have a route to the label page', function() {
        routes.should.have.property('label');
    });

    it('should have a route to the examen page', function() {
        routes.should.have.property('examen');
    });

    it('should have a route to the witken page', function() {
        routes.should.have.property('witken');
    });

    it('should have a route to the login page', function() {
        routes.should.have.property('login');
    });

    it('should have a route to the logout page', function() {
        routes.should.have.property('logout');
    });

    it('should have a route to the profile page', function() {
        routes.should.have.property('profile');
    });

    it('should have a route to the order confirmation page', function() {
        routes.should.have.property('confirm_order');
    });

    it('should cover all exports functions', function() {
        var counter = 0;
        for (var key in routes) {
            counter++;
        }
        counter.should.be.equal(NB_EXPORTS_OBJECTS);
    });

});