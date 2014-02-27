var routes = require('./witken/routes.js');

var user = require('./witken/user.js');
var auth = require('./witken/authentication.js');
var email = require('./witken/email.js');

var eventbrite = require('./witken/eventbrite.js');
var examen = require('./witken/examen.js');

var utils = require('./witken/utils.js');

var USER_DB = 'mongodb://test:test@10.0.0.133:27017/witken';
var EXAMEN_DB = 'mongodb://test:test@10.0.0.133:27017/witken';
var EVENTBRITE_ORGANIZATION = "MGSDD";
var EVENTBRITE_ORGANIZATION_ID = 5669656715;

auth.init(user, utils);
user.init(utils, email, USER_DB, function() {
    console.log('user connection error');
}, function() {
    console.log('user connection success');
});
eventbrite.init(utils, examen, user, EVENTBRITE_ORGANIZATION, EVENTBRITE_ORGANIZATION_ID);
routes.init(eventbrite, examen);
examen.init(eventbrite, utils, user, EXAMEN_DB, function error(err) {
    console.log('examen connection error');;
}, function success() {
console.log('examen connection success');
});
email.init();

exports.routes = routes;
exports.user = user;
exports.auth = auth;
exports.email = email;
exports.eventbrite = eventbrite;
exports.examen = examen;
exports.utils = utils;
