var routes = require('./routes.js');
var User = require('./user.js');
var eventbrite = require('./eventbrite.js');

var express = require('express');
var app = express();

var ejs = require('ejs');
ejs.open = '§;';
ejs.close = ';§';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var passportInit = function () {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            console.log('Using Passport local strategy with credentials: ' + username + '/' + password);
            User.findOne({
                email: username
            }, function (err, user) {
                if (err) {
                    console.log('Error whiel calling User.findOne(): ' + err)
                    return done(err);
                }
                if (!user) {
                    console.log('Error: Incorent username');
                    return done(null, false, {
                        field: 'email',
                        message: 'Incorrect username.'
                    });
                }
                if (!user.validPassword(password)) {
                    console.log('Error: Incorrect password');
                    return done(null, false, {
                        field: 'pass',
                        message: 'Incorrect password.'
                    });
                }
                console.log('Using Passport local strategy with credentials: ' + username + '/' + password + ' success!');
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        console.log('Serializing user ' + JSON.stringify(user));
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        console.log('Deserializing of ' + id);
        User.findOne({
            _id: id
        }, function (err, user) {
            console.log('Obtaining ' + JSON.stringify(user));
            done(err, user);
        });
    });
}

passportInit();
User.init();
eventbrite.init();

app.configure(function () {
    app.use(express.favicon()); // отдаем стандартную фавиконку, можем здесь же свою задать
    app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
    app.use(express.static('public'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'secret witken session'
    }));
    app.use(express.bodyParser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.engine('.html', ejs.__express);
    app.set('views', __dirname + '/views');
});

app.get('/', routes.index);

app.get('/inscription', routes.inscription);

app.get('/order_confirm', routes.confirm_order);

app.get('/logout', routes.logout);

app.get('/label', routes.label.index);

app.get('/examen', routes.examen.index);

app.get('/witken', routes.witken.index);

app.post('/auth', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var data = new Object();
        data.err = [];
        if (err) {
            data.err.push({
                field: 'general',
                error: err
            });
            return res.send(data);
        }
        if (!user) {
            data.err.push({
                field: info.field,
                error: info.message
            });
            return res.send(data);
        }
        req.logIn(user, function (err) {
            if (err) {
                data.err.push({
                    field: 'general',
                    error: err
                });
                return res.send(data);
            }
            data.redirect = {
                path: '/'
            }
            return res.send(data);
        });
    })(req, res, next);
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});

exports.mode = process.env.MODE || 'DEV';
exports.connected = process.env.CONNECTED || "YES"