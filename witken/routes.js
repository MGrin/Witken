var eventbrite;
var examen_;
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
    examen_ = _examen;
    utils = _utils;
    user = _user;
    invitations = _invitations;
}

var profile = {};

profile.online_test = function (req, res) {
    var user = req.user;

    if(user){
        if(user.isOnlineTestDone()){
            return res.redirect('/profile');
        }else{
            user.startOnlineTest(function(){
                res.render('profile/online_test.html', generateParams(req));
            });            
        }
    }else{
        return res.redirect('/login');
    }
}

profile.prof_data = function(req, res){
    if (req.user) {
        res.render('profile/professional_data.html', generateParams(req));
    } else {
        res.redirect('/login');
    }
}

profile.index = function(req, res) {
    if (req.user) {
        var user = req.user;
        if(user.isOnlineTestDone()){
            res.render('profile.html', generateParams(req));
        }else{
            res.redirect('/online_test');
        }        
    } else {
        res.redirect('/login');
    }
}

var api = {};
//POST
api.online_test = function (req, res) {
    var testData = req.body.testData;
    var user = req.user;

    if (user) {        
        if(user.isOnlineTestDone()){
            res.redirect('/profile');
        }else if(!testData){
            return res.send(new utils.ServerError('No test data received'));            
        }else{
            user.stopOnlineTest(testData, function(){
                return res.send({redirect: {path: '/profile'}});
            });
            
        }
    } else {
        return res.send(new utils.ServerError('Access denied'));
    }
}

var signup = function (req, res) {
    if (!req.user) {
        res.render('signup.html', generateParams(req));
    } else {
        res.redirect('/profile');
    }
}

var login = function(req, res) {
    if (!req.user) {
        res.render('login.html', generateParams(req));
    } else {
        res.redirect('/profile');
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
    examen_.getValidExamensList(function(err, e) {
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

exports.init = init;

exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.index = index;
exports.label = label;
exports.examen = examen;
exports.witken = witken;

exports.profile = profile;
exports.api = api;