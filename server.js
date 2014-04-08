var routes = process.env.APP_COV ? require(__dirname + '/cov/routes.js') : require(__dirname + '/witken/routes.js');

var user = process.env.APP_COV ? require(__dirname + '/cov/user.js') : require(__dirname + '/witken/user.js');
var auth = process.env.APP_COV ? require(__dirname + '/cov/authentication.js') : require(__dirname + '/witken/authentication.js');
var email = process.env.APP_COV ? require(__dirname + '/cov/email.js') : require(__dirname + '/witken/email.js');

var eventbrite = process.env.APP_COV ? require(__dirname + '/cov/eventbrite.js') : require(__dirname + '/witken/eventbrite.js');
var examen = process.env.APP_COV ? require(__dirname + '/cov/examen.js') : require(__dirname + '/witken/examen.js');

var label = process.env.APP_COV ? require(__dirname + '/cov/label.js') : require(__dirname + '/witken/label.js');

var utils = process.env.APP_COV ? require(__dirname + '/cov/utils.js') : require(__dirname + '/witken/utils.js');

var invitation = process.env.APP_COV ? require(__dirname + '/cov/invitations.js') : require(__dirname + '/witken/invitations.js');

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


var express = require('express');
var app = express();

var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}'

app.configure(function() {
    app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.static('public'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'secret witken session'
    }));
    app.use(express.bodyParser());
    app.use(auth.passport.initialize());
    app.use(auth.passport.session());
    app.use(app.router);
    app.engine('.html', ejs.__express);
    app.set('views', __dirname + '/views');
});

app.get('/', routes.index);
app.get('/label', routes.label);
app.get('/examen', routes.examen);
app.get('/witken', routes.witken);

app.post('/signup', auth.signup);
app.get('/online_test', routes.online_test);

app.get('/login', routes.login);
app.get('/order_confirm', examen.confirm_order);
app.get('/profile', routes.profile);
app.get('/profile/prof_data', routes.prof_data);
app.get('/logout', routes.logout);

app.post('/auth', auth.authenticate);


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});