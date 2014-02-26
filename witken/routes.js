var eventbrite;
var examen;
var utils;

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

var init = function(_eventbrite, _examen, _utils) {
    eventbrite = _eventbrite;
    examen = _examen;
    utils = _utils;
}

var login = function(req, res) {
    res.render('template.html', generateParams(req, 'login'));
}

var confirm_order = function(req, res) {
    var eventID = req.query.eid;
    var orderID = req.query.oid;

    eventbrite.confirmOrder(eventID, orderID, function(err, user) {
        var params = generateParams(req, 'signup');
        params.err = 'None';
        params.user = 'None';

        if (err) {
            params.err = err;
            params.content = 'login';
        } else {
            params.user = user;
        }

        if (user && user.hasPassword) {
            params.content = 'login';
        }
        res.render('template.html', params);
    });
}

var profile = function(req, res) {
    if (req.user) {
        res.render('template.html', generateParams(req, 'profile'));
    } else {
        res.render('template.html', generateParams(req, 'login'));
        //res.redirect('/login');
    }
}

var logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

var index = function(req, res) {
    res.render('template.html', generateParams(req, 'index'));
}

var label = function(req, res) {
    res.render('template.html', generateParams(req, 'label'));
}

var examen = function(req, res) {
    var params = generateParams(req, 'examen');
    params.err = 'None';
    params.events = 'None';
    examen.getValidExamensList(function(err, e) {
        if (err) {
            params.err = err;
        } else {
            params.events = e;
        }
        res.render('template.html', params);
    });
}

var witken = function(req, res) {
    res.render('template.html', generateParams(req, 'witken'));
}

var api = new Object();
api.getExamenStatus = function(req, res) {
    var examID = req.query.exam_id;
    if (!examID) {
        return res.send(utils.generateInputError('Database', 'No parameters was givenm'));
    }
    examen.Examen.findOne({
        eb_id: examID
    }, function(err, ex) {
        if (err) {
            return res.send(utils.generateDatabaseError('Examen', err));
        }
        if (!ex) {
            return res.send(utils.generateServerError('warning', 'No examen found with following id: ' + examID));
        }
        return res.send({
            status: ex.status
        });
    })
}

exports.api = api;
exports.init = init;
exports.login = login;
exports.confirm_order = confirm_order;
exports.profile = profile;
exports.logout = logout;
exports.index = index;
exports.label = label;
exports.examen = examen;
exports.witken = witken;