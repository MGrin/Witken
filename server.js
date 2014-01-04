var routes = process.env.APP_COV
  ? require(__dirname + '/../cov/routes.js') 
  : require(__dirname + '/witken/routes.js');
var user = process.env.APP_COV
  ? require(__dirname + '/../cov/user.js') 
  : require(__dirname + '/witken/user.js');
var eventbrite = process.env.APP_COV
  ? require(__dirname + '/../cov/eventbrite.js') 
  : require(__dirname + '/witken/eventbrite.js');
var auth = process.env.APP_COV
  ? require(__dirname + '/../cov/authentication.js') 
  : require(__dirname + '/witken/authentication.js');

var express = require('express');
var app = express();

var ejs = require('ejs');
ejs.open = '§;';
ejs.close = ';§';

app.configure(function () {
    app.use(express.favicon()); // отдаем стандартную фавиконку, можем здесь же свою задать
    app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
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


    auth.passportInit();
    user.init();
    eventbrite.init();
});

app.get('/', routes.index);

app.get('/label', routes.label);

app.get('/examen', routes.examen);

app.get('/witken', routes.witken);

app.get('/inscription', routes.inscription);

app.get('/order_confirm', routes.confirm_order);

app.get('/profile', routes.profile);

app.get('/logout', routes.logout);

//POST stuff
app.post('/auth', auth.authenticate);

app.post('/signup', auth.signup);

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});

exports.mode = process.env.MODE || 'DEV';
exports.connected = process.env.CONNECTED || "YES"