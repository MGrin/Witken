var eventbrite;
var examen;
var utils;
var user;
var email;
var invitations;

function generateParams(req) {
    var par = {};

    par.err = 'None';

    if (!req.param('lang')) {
        par.lang = 'fr';
    } else if (req.param('lang') === 'fr' || req.param('lang') === 'en') {
        par.lang = req.param('lang');
    } else {
        par.lang = 'fr';
    }

    if (!req.user) {
        par.user = 'None';
    } else {
        par.user = req.user.generatePublicObject();
    }

    return par;
}

var init = function(_eventbrite, _examen, _utils, _user, _email, _invitations) {
    eventbrite = _eventbrite;
    examen = _examen;
    utils = _utils;
    user = _user;
    invitations = _invitations;
}

var login = function(req, res) {
    res.render('login.html', generateParams(req));
}

var confirm_order = function(req, res) {
    var eventID = req.query.eid;
    var orderID = req.query.oid;

    eventbrite.confirmOrder(eventID, orderID, function(err, user) {
        var params = generateParams(req);
        params.err = 'None';
        params.user = 'None';

        if(err){
            params.err = err;
            return res.redirect('login.html', params);
        }
        if(user){
            params.user = user;
            if(user.hasPassword){
                return res.redirect('login.html', params);
            }
            return res.render('signup.html', params);
        }
        return res.redirect('login.html', params);
    });
}

var profile = function(req, res) {
    if (req.user) {
        res.render('profile.html', generateParams(req));
    } else {
        res.redirect('login');
    }
}

var prof_data = function(req, res){
    if (req.user) {
        res.render('profile/professional_data.html', generateParams(req));
    } else {
        res.redirect('login');
    }
}

var logout = function(req, res) {
    req.logout();
    return res.redirect('/');
}

var index = function(req, res) {
    return res.render('index.html', generateParams(req));
}

var label = function(req, res) {
    return res.render('label.html', generateParams(req));
}

var examen = function(req, res) {
    var params = generateParams(req);
    params.err = 'None';
    params.events = 'None';
    examen.getValidExamensList(function(err, e) {
        if (err) {
            params.err = err;
        } else {
            params.events = e;
        }
        return res.render('examen.html', params);
    });
}

var witken = function(req, res) {
    return res.render('witken.html', generateParams(req));
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
    });
}

api.invite = function(req, res){
    var invitation = req.body.invitation;
    if(!invitation){
        return res.send(utils.generateInputError('email', 'No email was received'));
    }
    var u = req.user;
    if(!u){
        return res.send(utils.generateHackingError('Route', 'You are not logged in!'));
    }

    user.User.findOne({email: u.email}, function(err, us){
        if(err){
            return res.send(utils.generateDatabaseError('User', err));
        }
        if(!us){
            return res.send(utils.generateDatabaseError('User', 'User '+u.email+' was not found'));
        }
        if(!us.invitations){
            us.invitations = [];
        }
        invitations.invite(invitation, us, function(err){
            if(err){
                return res.send(err);
            }
            return res.send({status: 'ok'});
        })
    });
}

exports.api = api;
exports.init = init;
exports.login = login;
exports.confirm_order = confirm_order;
exports.profile = profile;
exports.prof_data = prof_data;
exports.logout = logout;
exports.index = index;
exports.label = label;
exports.examen = examen;
exports.witken = witken;