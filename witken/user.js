var randomstring = require("randomstring");
var crypto = require('crypto');
var email = require('./email.js');

var witken_users = 'mongodb://witkenDB:usersDB2013WitKen@ds057538.mongolab.com:57538/witken_users'
var mongoose = require('mongoose');

var emailRE = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var passRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;

var utils = process.env.APP_COV ? require(__dirname + '/../cov/utils.js') : require(__dirname + '/utils.js');

exports.setDB = function (url) {
    witken_users = url;
}

exports.init = function () {
    mongoose.connect(witken_users);
    var db = mongoose.connection;

    db.on('error', function () {
        console.log('Failed to connect to UsersDB');
        if (require('../server.js').connected === 'YES')
            process.exit(1);
    });
    db.once('open', function callback() {
        //console.log('Connected to UsersDB');
    });
}

var userSchema = mongoose.Schema({
    email: String,
    password_sel: {
        type: String,
        default: randomstring.generate(3)
    },
    password: {
        type: String,
        default: randomstring.generate()
    },
    hasPassword: {
        type: Boolean,
        default: false
    },
    human_data: {
        prefix: String,
        first_name: String,
        last_name: String,
        gender: String,
        birth_date: Date,
    },
    contact: {
        home_phone: String,
        cell_phone: String,
        home_address: String,
        home_postal_code: String,
        home_country_code: String,
        home_city: String,
    },
    job: {
        job_title: String,
        work_address: String
    },
    eventbrite: [
        {
            event_id: Number,
            ticket_id: Number
            }
        ],
    witken: {
        results: {
            type: Array,
            default: [],
        }
    }
});

userSchema.methods.validPassword = function (p) {
    if (this.hasPassword) {
        var selled_hash = crypto.createHash('md5').update(this.password_sel + p).digest('base64');
        return selled_hash === this.password;
    } else {
        return false;
    }
}

userSchema.methods.generatePublicObject = function(){
    return {
        email: this.email,
        hasPassword: this.hasPassword,
        human_data: {
            prefix: this.human_data.prefix,
            first_name: this.human_data.first_name,
            last_name: this.human_data.last_name,
            gender: this.human_data.gender,
            birth_date: new Date(this.human_data.birth_date),
        },
        contact: {
            home_phone: this.contact.home_phone,
            cell_phone: this.contact.cell_phone,
            home_address: this.contact.home_address,
            home_postal_code: this.contact.home_postal_code,
            home_country_code: this.contact.home_country_code,
            home_city: this.contact.home_city,
        },
        job: {
            job_title: this.contact.job_title,
            work_address: this.contact.work_address
        }
    };
}

var User = mongoose.model('User', userSchema);
exports.User = User;

var generateQuery = function (user) {
    return {
        email: user.email
    }
}


exports.addUser = function (user, callback) {
    User.find({
        email: user.email
    }, function (err, users) {
        if (err) {
            return callback(utils.generateDatabaseError('User', err));
        }
        if (users.length === 0) {
            user.save(function (err, u) {
                if (err) {
                    return callback(utils.generateDatabaseError('User', err));
                } else {
                    email.sendInscriptionConfirmation(u);
                    return callback(null, u)
                }
            });
        } else {
            return callback(utils.generateServerError('fatal', 'Already registered'));
        }
    });
}

exports.findOne = function (query, callback) {
    User.find(query, function (err, users) {
        if (err) {
            return callback(utils.generateDatabaseError('User', err));
        }
        if (users.length === 0) {
            return callback(null, null);
        }
        if (users.length > 1) {
            return callback(utils.generateDatabaseError('User', 'More than one user with the same ' + JSON.stringify(query)));
        }
        return callback(null, users[0]);
    });
}

exports.setPassword = function (email, passwd, callback) {
    User.findOne({
        email: email
    }, function (err, us) {
        if (err) {
            return callback(utils.generateDatabaseError('User', err));
        }

        if (!us) {
            return callback(utils.generateServerError('warning', 'User ' + email + ' not found'));
        }

        if (us.hasPassword === true) {
            return callback(utils.generateServerError('fatal', 'Already has password'));
        }

        us.password = crypto.createHash('md5').update(us.password_sel + passwd).digest('base64');
        us.hasPassword = true;
        us.save();
        return callback(null, us);
    });
}

exports.changePassword = function (email, new_passwd, passwd, callback) {
    User.findOne({
        email: email
    }, function (err, us) {
        if (err) {
            return callback(utils.generateDatabaseError('User', err));
        }

        if (!us) {
            return callback(utils.generateServerError('warning', 'No user found'));
        }

        if (!us.validPassword(passwd)) {
            return callback(utils.generateInputError('password', 'Wrong old password'));
        }

        us.password = crypto.createHash('md5').update(us.password_sel + new_passwd).digest('base64');
        us.save();
        return callback(null, us);
    });
}

exports.confirmOrder = function (eb_data, callback) {
    var user = new User({
        email: eb_data.email,
        human_data: {
            prefix: eb_data.prefix,
            first_name: eb_data.first_name,
            last_name: eb_data.last_name,
            gender: eb_data.gender,
            birth_date: new Date(eb_data.birth_date),
        },
        contact: {
            home_phone: eb_data.home_phone,
            cell_phone: eb_data.cell_phone,
            home_address: eb_data.home_address,
            home_postal_code: eb_data.home_postal_code,
            home_country_code: eb_data.home_country_code,
            home_city: eb_data.home_city,
        },
        job: {
            job_title: eb_data.job_title,
            work_address: eb_data.work_address
        },
        eventbrite: [
            {
                event_id: eb_data.event_id,
                ticket_id: eb_data.ticket_id
            }
        ]
    });

    exports.addUser(user, function (err, u) {
        if (err) {
            if (err.error_message !== 'Already registered') {
                return callback(err);
            } else {
                User.findOne({
                    email: user.email
                }, function (err, us) {
                    if (err) {
                        return callback(utils.generateDatabaseError('User', err));
                    }

                    if (!us) {
                        return callback(utils.generateServerError('warning', 'No user found'));
                    }

                    if (!us.eventbrite) {
                        us.eventbrite = [];
                    }
                    us.eventbrite.push({
                        event_id: eb_data.event_id,
                        ticket_id: eb_data.ticket_id
                    });
                    us.save();
                    return callback(err, u.generatePublicObject);
                });
            }
        }
        return callback(null, u.generatePublicObject)
    });
}