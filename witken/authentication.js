var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
exports.passport = passport;

var user;
var utils;

exports.init = function(_user, _utils) {
    user = _user;
    utils = _utils;

    passport.use(new LocalStrategy(
        function(username, password, done) {
            //console.log('Using Passport local strategy with credentials: ' + username + '/' + password);
            user.User.findOne({
                email: username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    var err = utils.generateInputError('email', 'Incorrect username.');
                    return done(null, false, err);
                }
                if (!user.validPassword(password)) {
                    var err = utils.generateInputError('pass', 'Incorrect password.');
                    return done(null, false, err);
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        //console.log('Deserializing of ' + id);
        user.User.findOne({
            _id: id
        }, function(err, user) {
            done(err, user);
        });
    });
}

exports.authenticate = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        var data = new Object();
        if (err) {
            data.err = utils.generateInputError('general', err);
            return res.send(data);
        }
        if (!user) {
            data.err = info;
            return res.send(data);
        }
        req.logIn(user, function(err) {
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

exports.signup = function(req, res) {
    var data = req.body.user_data;

    user.User.findOne({
        email: data.email
    }, function(err, us) {
        if (err) {
            return res.send({
                err: err
            });
        }
        if (us) {
            return res.send({
                err: utils.generateInputError('email', 'User ' + ureq.body.user.email + ' already exists')
            });
        }

        user.create(data, function(err, us){
            if(err){
                return res.send({
                    err: utils.generateDatabaseError('User', err)
                });
            }
            req.user = us;
            req.login();
            return res.redirect('/online_test');
        });

    });
}