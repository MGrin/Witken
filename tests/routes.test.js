var should = require('should');
var routes = process.env.APP_COV ? require(__dirname + '/../cov/routes.js') : require(__dirname + '/../witken/routes.js');

var testUser = {
    "contact": {
        "home_phone": "",
        "cell_phone": "",
        "home_address": "",
        "home_postal_code": "",
        "home_country_code": "",
        "home_city": ""
    },
    "email": "test@user.com",
    "eventbrite": [
        {
            "ticket_id": 1234,
            "event_id": 1234
        }
    ],
    "hasPassword": true,
    "human_data": {
        "prefix": "Mr",
        "first_name": "Test",
        "last_name": "User",
        "gender": "Male",
        "birth_date": {
            "$date": "2014-01-23T17:29:36.258Z"
        }
    },
    "job": {
        "job_title": "Witken",
        "work_address": ""
    },
    "witken": {
        "results": []
    },
    generatePublicObject: function () {
        return {
            email: this.email,
            hasPassword: this.hasPassword,
            human_data: {
                prefix: this.human_data.prefix,
                first_name: this.human_data.first_name,
                last_name: this.human_data.last_name,
                gender: this.human_data.gender,
                birth_date: new Date(this.human_data.birth_date),
            },
            contact: {
                home_phone: this.contact.home_phone,
                cell_phone: this.contact.cell_phone,
                home_address: this.contact.home_address,
                home_postal_code: this.contact.home_postal_code,
                home_country_code: this.contact.home_country_code,
                home_city: this.contact.home_city,
            },
            job: {
                job_title: this.contact.job_title,
                work_address: this.contact.work_address
            },
            witken: {
                results: this.witken.results
            },
            eventbrite: this.eventbrite
        };
    }
}

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
            var req = generateReq(null, null, testUser);
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
                done();
            }
            routes.inscription(req, res);
        });
    });

    describe('Routes.confirm_orfder', function () {

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
    }

    return res;
}

function generateParams(req, content) {
    var par = {};

    par.err = 'None';
    par.content = content;

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
        par.user = req.user.generatePublicObject();
    }

    return par;
}