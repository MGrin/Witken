function generateParams(req, content) {
    var par = {};

    par.content = content;
    
    par.connected=require('./server.js').connected;
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

exports.auth = function (req, res) {
    res.render('template.html', generateParams(req, 'auth'));
}
exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
}
exports.index = function (req, res) {
    res.render('template.html', generateParams(req, 'index'));
}

exports.label = {};
exports.examen = {};
exports.witken = {};

exports.label.index = function (req, res) {
    res.render('template.html', generateParams(req, 'label_index'));
}

exports.examen.index = function (req, res) {
    res.render('template.html', generateParams(req, 'examen_index'));
}

exports.witken.index = function (req, res) {
    res.render('template.html', generateParams(req, 'witken_index'));
}