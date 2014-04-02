var randomstring = require("randomstring");
var crypto = require('crypto');
var mongoose = require('mongoose');

var email;
var utils;
var witken_users;
var invitation;

exports.init = function(_utils, _email, _invitation, _db, error_callback, success_callback) {
    if (!_utils || !_email || !_db || !error_callback || !success_callback) {
        throw 'Wrong arguments exception!';
        return;
    }
    utils = _utils;
    email = _email;
    invitation = _invitation;
    witken_users = _db;

    mongoose.connect(witken_users);
    var db = mongoose.connection;

    db.on('error', function() {
        return error_callback('Failed to connect to User DB');
    });
    db.once('open', success_callback);
}

var userTools = {
    generateHashedPassword: function(us, pwd) {
        return crypto.createHash('sha1').update(us.password_sel + pwd + us.email).digest('base64');
    }
}

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password_sel: {
        type: String,
        default: randomstring.generate(3)
    },
    password: {
        type: String,
        default: randomstring.generate(10)
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
    examen: {
        type: Object,
        default: null
    },
    next_exams: {
        type: Array,
        default: []
    },
    label: {
        type: Object,
        default: null
    },
    result: {
        type: Object,
        default: null
    },
    invitations: {
        type: Array,
        default: []
    }
});

userSchema.methods.validPassword = function(p) {
    if (this.hasPassword) {
        var selled_hash = userTools.generateHashedPassword(this, p);
        return selled_hash === this.password;
    } else {
        return false;
    }
}

userSchema.methods.generatePublicObject = function() {
    if(this.examen && this.examen.date < new Date()){
        console.log('Exam date is over');
        this.next_exams.push(this.examen);
        this.examen = null;
        this.save();
    }
    var res = {
        email: this.email,
        _id: this._id,
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
        },
        examen: this.examen,
        label: this.label
    };
    return res;
}
userSchema.methods.generateShortObject = function() {
    var res = {
        email: this.email,
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
    return res;
}
userSchema.methods.setPassword = function(passwd, callback) {
    if (this.hasPassword === true) {
        return callback(utils.generateServerError('fatal', 'Already has password'));
    }

    this.password = userTools.generateHashedPassword(this, passwd);
    this.hasPassword = true;
    this.save();
    return callback(null, this);
}

userSchema.methods.changePassword = function(new_passwd, passwd, callback) {
    if (!this.hasPassword) {
        return callback(utils.generateHackingError('User.changePassword', 'The password was not set yet!'));
    }
    if (!this.validPassword(passwd)) {
        return callback(utils.generateInputError('password', 'Wrong old password'));
    }

    this.password = userTools.generateHashedPassword(this, new_passwd);
    this.save();
    return callback(null, this);
}

userSchema.methods.addExamen = function(ex) {
    if (!this.examen) {
        this.examen = ex;
    } else {
        var exist = false;
        for (var i = 0; i < this.next_exams.length; i++) {
            if (ex.eb_id === this.next_exams[i].eb_id) {
                exist = true;
            }
        }
        if (!exist) {
            if (this.examen.date > ex.date) {
                this.next_exams.push(this.examen);
                this.examen = ex;
            } else {
                this.next_exams.push(ex);
            }
        }
    }
    this.save();
}

userSchema.methods.addInvitation = function(inv){
    this.invitations.push(inv);
    this.save();
}

userSchema.methods.notifyByEmail = function (type, content) {
    if(type === 'invitation'){
        email.sendInvitationConfirmation(this.email, content);
    }
}
var User = mongoose.model('User', userSchema, 'users');

var getUserFromEventbrite = function(eb_user, callback) {
    User.findOne({
        email: eb_user.email
    }, function(err, us) {
        if (err) {
            return callback(utils.generateDatabaseError('User', err));
        }
        if (us) {
            return callback(null, us);
        }
        if (!us) {
            us = new User({
                email: eb_user.email,
                human_data: {
                    prefix: eb_user.prefix,
                    first_name: eb_user.first_name,
                    last_name: eb_user.last_name,
                    gender: eb_user.gender,
                    birth_date: new Date(eb_user.birth_date),
                },
                contact: {
                    home_phone: eb_user.home_phone,
                    cell_phone: eb_user.cell_phone,
                    home_address: eb_user.home_address,
                    home_postal_code: eb_user.home_postal_code,
                    home_country_code: eb_user.home_country_code,
                    home_city: eb_user.home_city,
                },
                job: {
                    job_title: eb_user.job_title,
                    work_address: eb_user.work_address
                }
            });
            invitation.updateInvitation({email: eb_user.email});
            us.save();
            return callback(null, us);
        }
    })
}

var create = function(data, callback){
    //Check data
    //TODO

    var u = new User(data);
    u.save(function(err){
        if(err) return callback(err);
        //TODO
        //send email
        callback(null, u);
    });
}

exports.User = User;
exports.tools = userTools;
exports.getUserFromEventbrite = getUserFromEventbrite;
exports.create = create;