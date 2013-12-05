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
exports.indexation = {};
exports.witken = {};

exports.label.index = function (req, res) {
    res.render('template.html', generateParams(req, 'label_index'));
}

exports.label.description = function (req, res) {
    res.render('template.html', generateParams(req, 'label_description'));
}

exports.label.reconnaissance = function (req, res) {
    res.render('template.html', generateParams(req, 'label_reconnaissance'));
}

exports.examen.index = function (req, res) {
    res.render('template.html', generateParams(req, 'examen_index'));
}

exports.examen.inscription = function (req, res) {
    res.render('template.html', generateParams(req, 'examen_inscription'));
}

exports.indexation.index = function (req, res) {
    res.render('template.html', generateParams(req, 'indexation_index'));
}

exports.indexation.comment = function (req, res) {
    res.render('template.html', generateParams(req, 'indexation_comment'));
}

exports.indexation.pour_qui = function (req, res) {
    res.render('template.html', generateParams(req, 'indexation_pour_qui'));
}

exports.witken.index = function (req, res) {
    res.render('template.html', generateParams(req, 'witken_index'));
}

exports.witken.nous = function (req, res) {
    res.render('template.html', generateParams(req, 'witken_nous'));
}

exports.witken.partenaires = function (req, res) {
    res.render('template.html', generateParams(req, 'witken_partenaires'));
}