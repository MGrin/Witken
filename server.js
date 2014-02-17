var routes = process.env.APP_COV ? require(__dirname + '/cov/routes.js') : require(__dirname + '/witken/routes.js');

var user = process.env.APP_COV ? require(__dirname + '/cov/user.js') : require(__dirname + '/witken/user.js');
var auth = process.env.APP_COV ? require(__dirname + '/cov/authentication.js') : require(__dirname + '/witken/authentication.js');
var email = process.env.APP_COV ? require(__dirname + '/cov/email.js') : require(__dirname + '/witken/email.js');

var eventbrite = process.env.APP_COV ? require(__dirname + '/cov/eventbrite.js') : require(__dirname + '/witken/eventbrite.js');
var examen = process.env.APP_COV ? require(__dirname + '/cov/examen.js') : require(__dirname + '/witken/examen.js');

var utils = process.env.APP_COV ? require(__dirname + '/cov/utils.js') : require(__dirname + '/witken/utils.js');

var USER_DB = 'mongodb://witkenDB:witkenDB2013WitKen@ds031319.mongolab.com:31319/witken';
var EXAMEN_DB = 'mongodb://witkenDB:witkenDB2013WitKen@ds031319.mongolab.com:31319/witken';

var EVENTBRITE_ORGANIZATION = "MGSDD";
var EVENTBRITE_ORGANIZATION_ID = 5669656715;

auth.init(user, utils);
user.init(utils, email, USER_DB, function(err) {
    console.log('Failed to connect to User DB');
}, function() {
    console.log('Connected to User DB');
});
eventbrite.init(utils, examen, user, EVENTBRITE_ORGANIZATION, EVENTBRITE_ORGANIZATION_ID);
routes.init(eventbrite, examen);
examen.init(eventbrite, utils, user, EXAMEN_DB, function error(err) {
    console.log('Failed to connect to Examen DB');
}, function success() {
    console.log('Connected to Examen DB');
    examen.updateExamensList(function() {})
    setInterval(function() {
        examen.updateExamensList(function() {});
    }, 1000 * 60 * 60 * 24);
});

email.init();

var express = require('express');
var app = express();

var ejs = require('ejs');
ejs.open = '§§';
ejs.close = ';§';

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
app.get('/login', routes.login);
app.get('/order_confirm', routes.confirm_order);
app.get('/profile', routes.profile);
app.get('/logout', routes.logout);

app.post('/auth', auth.authenticate);
app.post('/signup', auth.signup);

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});