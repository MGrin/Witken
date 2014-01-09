var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
exports.passport = passport;

var user = require('./user.js');
var utils = process.env.APP_COV ? require(__dirname + '/../cov/utils.js') : require(__dirname + '/utils.js');

exports.passportInit = function () {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            //console.log('Using Passport local strategy with credentials: ' + username + '/' + password);
            user.findOne({
                email: username
            }, function (err, user) {
                if (err) {
                    //console.log('Error whiel calling user.findOne(): ' + err)
                    return done(err);
                }
                if (!user) {
                    //console.log('Error: Incorent username');
                    var err = utils.generateInputError('email', 'Incorrect username.');
                    return done(null, false, err);
                }
                if (!user.validPassword(password)) {
                    //console.log('Error: Incorrect password');
                    var err = utils.generateInputError('pass', 'Incorrect password.');
                    return done(null, false, err);
                }
                //console.log('Using Passport local strategy with credentials: ' + username + '/' + password + ' success!');
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        console.log('Serializing user ' + JSON.stringify(user));
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        //console.log('Deserializing of ' + id);
        user.findOne({
            _id: id
        }, function (err, user) {
            //console.log('Obtaining ' + JSON.stringify(user));
            done(err, user);
        });
    });
}

exports.authenticate = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var data = new Object();
        if (err) {
            data.err = utils.generateInputError('general', err);
            return res.send(data);
        }
        if (!user) {
            data.err = info;
            return res.send(data);
        }
        req.logIn(user, function (err) {
            if (err) {
                data.err = utils.generateInputError('general', err);
                return res.send(data);
            }
            data.redirect = {
                path: '/profile'
            }
            return res.send(data);
        });
    })(req, res, next);
}

exports.signup = function (req, res) {
    var user_email = req.body.user_email;
    var passwd = req.body.pass;

    user.setPassword(user_email, passwd, function (err) {
        if (err) {
            res.send({
                err: err
            });
        }
    });
}