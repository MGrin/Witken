var should = require('should');
var routes = process.env.APP_COV ? require(__dirname + '/../cov/routes.js') : require(__dirname + '/../witken/routes.js');

describe('Routes', function () {
    it('should have a route to the index page', function () {
        should.exist(routes.index);
    });

    it('should have a route to the label page', function () {
        should.exist(routes.label);
    });

    it('should have a route to the examen page', function () {
        should.exist(routes.examen);
    });

    it('should have a route to the witken page', function () {
        should.exist(routes.witken);
    });

    it('should have a route to the inscription page', function () {
        should.exist(routes.inscription);
    });

    it('should have a route to the order confirmation page', function () {
        should.exist(routes.confirm_order);
    });

    it('should have a profile page', function () {
        should.exist(routes.profile);
    });

    it('should have a route to the logout page', function () {
        should.exist(routes.logout);
    });

    describe('Routes static pages', function () {
        it('should route to static pages', function () {
            var req = generateReq();
            var res = generateRes('template.html', generateParams(req, 'index'));
            routes.index(req, res);

            req = generateReq();
            res = generateRes('template.html', generateParams(req, 'witken_index'));
            routes.witken(req, res);

            var req = generateReq();
            var res = generateRes('template.html', generateParams(req, 'label_index'));
            routes.label(req, res);

            var req = generateReq();
            var res = generateRes('template.html', generateParams(req, 'examen_index'));
            routes.examen(req, res);
        });
    });

    describe('Routes.logout', function () {
        it('should redirect to index page after logout', function () {
            var req = generateReq();
            req.logout = function () {}
            var res = generateRes('template.html', generateParams(req, 'index'));
            res.redirect = function (page) {
                page.should.be.equal('/');
            }

            routes.logout(req, res);
        });
    });

    describe('Routes.profile', function () {
        it('should redirect to inscription when I\'m trying to go to profile page without loggin', function () {
            var req = generateReq();
            var res = generateRes('template.html', generateParams(req, 'profile'));
            res.redirect = function (page) {
                page.should.not.be.equal('/profile');
                page.should.be.equal('/inscription');
            }
            routes.profile(req, res);
        });

        it('should redirect if I\'m logged in', function () {
            var req = generateReq(null, null, {
                email: 'test@user.com'
            });
            var res = generateRes('template.html', generateParams(req, 'profile'));
            routes.profile(req, res);
        });
    });

    describe('Routes.inscription', function () {
        it('should add events to params when asked for inscription', function (done) {
            var req = generateReq();
            var res = generateRes('template.html');
            res.render = function (page, pars) {
                page.should.be.equal('template.html');
                pars.should.have.property('events');
                done();
            }
            routes.inscription(req, res);
        });
    });
    
    describe('Routes.confirm_orfder', function(){
        
    });
});

function generateReq(lang, ajax, user) {
    var req = {};
    req.user = user;
    req.param = function (p) {
        switch (p) {
        case 'lang':
            return lang;
        case 'ajax':
            return ajax;
        }
    }
    return req;
}

function generateRes(expected_page, expected_params) {
    var res = {};

    res.render = function (page, params) {
        page.should.be.equal(expected_page);
        if (expected_params) {
            JSON.stringify(params).should.be.equal(JSON.stringify(expected_params));
        }
    }

    return res;
}

function generateParams(req, content) {
    var par = {};

    par.content = content;

    par.connected = 'YES';

    if (!req.param('lang')) {
        par.lang = 'fr';
    } else if (req.param('lang') === 'fr' || req.param('lang') === 'en') {
        par.lang = req.param('lang');
    } else {
        par.lang = 'fr';
    }

    if (!req.param('ajax')) {
        par.render = 'full';
    } else {
        par.render = 'part';
    }

    if (!req.user) {
        par.user = 'None';
    } else {
        par.user = req.user;
    }

    return par;
}