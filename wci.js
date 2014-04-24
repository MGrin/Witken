var routes = require(__dirname + '/witken/routes.js');

var user = require(__dirname + '/witken/user.js');
var auth = require(__dirname + '/witken/authentication.js');
var email = require(__dirname + '/witken/email.js');

var eventbrite = require(__dirname + '/witken/eventbrite.js');
var examen = require(__dirname + '/witken/examen.js');

var label = require(__dirname + '/witken/label.js');

var utils = require(__dirname + '/witken/utils.js');

var invitation = require(__dirname + '/witken/invitations.js');

var CT = require(__dirname + '/CentralTest/CentralTest.js');

var USER_DB = 'mongodb://witkenDB:witkenDB2013WitKen@ds031319.mongolab.com:31319/witken';
var EXAMEN_DB = 'mongodb://witkenDB:witkenDB2013WitKen@ds031319.mongolab.com:31319/witken';
var INVITATION_DB = 'mongodb://witkenDB:witkenDB2013WitKen@ds031319.mongolab.com:31319/witken';
var LABEL_DB = 'mongodb://witkenDB:witkenDB2013WitKen@ds031319.mongolab.com:31319/witken';

var EVENTBRITE_ORGANIZATION = "MGSDD";
var EVENTBRITE_ORGANIZATION_ID = 5669656715;

email.init();
invitation.init(utils, user, email, INVITATION_DB, function error(err) {
    console.log('Failed to connect to Invitations DB');
}, function success() {
    console.log('Connected to Invitations DB');
});

auth.init(user, utils);
user.init(utils, email, invitation, USER_DB, function(err) {
    console.log('Failed to connect to User DB');
}, function() {
    console.log('Connected to User DB');

    user.User.findOne({email: 'mr6r1n@gmail.com'}, function (err, us){
        if(err) console.log('Failed to load a test user!');
        else exports.testUser = us;
    });
});
eventbrite.init(utils, examen, user, EVENTBRITE_ORGANIZATION, EVENTBRITE_ORGANIZATION_ID);
routes.init(eventbrite, examen, utils, user, email, invitation);
examen.init(eventbrite, utils, user, EXAMEN_DB, function error(err) {
    console.log('Failed to connect to Examen DB');
}, function success() {
    console.log('Connected to Examen DB');
    examen.updateExamensList(function() {})
    setInterval(function() {
        examen.updateExamensList(function() {});
    }, 1000 * 60 * 60 * 24);
});
label.init(utils, user, LABEL_DB, function error(err) {
    console.log('Failed to connect to Label DB');
}, function success() {
    console.log('Connected to Label DB');
});

CT.init(utils, function error(err) {
    console.log('Failed to connect to CentralTest WSDL: '+err);
}, function success() {
    console.log('Connected to CentralTest WSDL');
});

exports.routes = routes;
exports.user = user;
exports.auth = auth;
exports.eventbrite = eventbrite;
exports.examen = examen;
exports.label = label;
exports.utils = utils;
exports.invitation = invitation;
exports.CT = CT;