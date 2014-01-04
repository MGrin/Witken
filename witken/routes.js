var events = process.env.APP_COV ? require(__dirname + '/../cov/eventbrite.js') : require(__dirname + '/eventbrite.js')

function generateParams(req, content) {
    var par = {};

    par.content = content;

    par.connected = require('../server.js').connected;
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

exports.inscription = function (req, res) {
    var params = generateParams(req, 'inscription');
    events.getValidEvents(function (events) {
        params.events = events;
        res.render('template.html', params);
    });
}

exports.confirm_order = function (req, res) {
    var eventID = req.query.eid;
    var orderID = req.query.oid;

    events.confirmOrder(eventID, orderID, function (err, user) {
        var params = generateParams(req, 'sign_up');
        params.err = 'None';
        params.user = 'None';
        if (err) {
            params.err = err;
        } else {
            params.user = user;
        }
        
        if (params.err) {
            res.redirect('/inscription');
        } else {
            res.render('template.html', params);
        }
    });
}

exports.profile = function(req, res){
    var params = generateParams(req, 'profile');
    if(params.user!='None'){
        res.render('template.html', params);
    }else{
        res.redirect('/inscription');
    }    
}

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
}
exports.index = function (req, res) {
    res.render('template.html', generateParams(req, 'index'));
}
exports.label = function (req, res) {
    var params = generateParams(req, 'label_index');
    res.render('template.html', params);
}

exports.examen = function (req, res) {
    res.render('template.html', generateParams(req, 'examen_index'));
}

exports.witken = function (req, res) {
    res.render('template.html', generateParams(req, 'witken_index'));
}