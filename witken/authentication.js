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
            user.User.findOne({
                email: username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, new utils.ClientError('email', 'Incorrect username.'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, new utils.ClientError('password', 'Incorrect password.'));
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
        if (err) {
            return res.send(new utils.ClientError('general', err));
        }
        if (!user) {
            return res.send(new utils.ServerError(info));
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.send(new utils.ClientError('general', err));
            }
            data.redirect = {
                path: '/profile'
            }
            return res.send(data);
        });
    })(req, res, next);
}

exports.signup = function(req, res) {
    var data = req.body;
    user.User.findOne({
        email: data.email
    }, function(err, us) {
        if (err) {
            return res.send({
                err: err
            });
        }
        if (us) {
            return res.send(new utils.ClientError('email', 'User ' + data.email + ' already exists'));
        }

        user.create(data, function(err, us){
            if(err){
                throw new utils.DatabaseError('User', err);
                return res.send(new utils.DatabaseError('User', err));
            }
            req.user = us;
            //req.login();
            return res.redirect('/online_test');
        });

    });
}