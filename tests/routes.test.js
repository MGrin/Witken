var should = require('should');
var routes = process.env.APP_COV
  ? require(__dirname + '/../cov/routes.js') 
  : require(__dirname + '/../witken/routes.js');

describe('Routes', function(){
    it('should have a route to the index page', function(){
        should.exist(routes.index);
    });
    
    it('should have a route to the label page', function(){
        should.exist(routes.label);
    });
    
    it('should have a route to the examen page', function(){
        should.exist(routes.examen);
    });
    
    it('should have a route to the witken page', function(){
        should.exist(routes.witken);
    });
    
    it('should have a route to the inscription page', function(){
        should.exist(routes.inscription);
    });
    
    it('should have a route to the order confirmation page', function(){
        should.exist(routes.confirm_order);
    });
    
    it('should have a route to the logout page', function(){
        should.exist(routes.logout);
    });
});

describe('Routes.index', function(){
    
});