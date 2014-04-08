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

    db.on('error', error_callback);
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
        home_country: String,
        home_city: String,
    },
    job: {
        job_title: String,
        work_address: String
    },
    online_test: {
        type: Object,
        default: undefined
    }
});

userSchema.methods.validPassword = function(p) {
    //TODO is called on each login, so we can check for the online test date
    var selled_hash = userTools.generateHashedPassword(this, p);
    return selled_hash === this.password;
}

userSchema.methods.startOnlineTest = function () {
    if (this.online_test && !this.online_test.done ) {
        //TODO Test was already started, need to restart??
    } else {
        // Test is starting for the first time
        //TODO
        this.online_test = {
            start_date: new Date(),
            done: false
        }
        this.save();
    }
}

userSchema.methods.stopOnlineTest = function (testData) {
    if(!testData) throw new Exception('BAD THING');
    this.online_test.done = true;
    //TODO send data to CentralTest
}

userSchema.methods.generatePublicObject = function() {
    //TODO
    throw new Exception('Failed');
}

var User = mongoose.model('User', userSchema, 'users');

var checkParams = function (data, cb) {

    if(!(data.email && data.password &&
            data.prefix && data.first_name && data.last_name &&
            data.gender && data.birth_date && data.home_phone &&
            data.cellphone && data.home_address && data.home_postal_code &&
            data.home_country && home_city && data.job_title && data.work_address)){
        return cb(new utils.InputError('general', 'Please, fill all required fields.'));
    }

    return cb();
}

var create = function(data, callback){
    checkParams(data, function(err){
        if(err) return callback(err);
        var u = new User({
            email: data.email,
            password: data.password,
            human_data: {
                prefix: data.prefix,
                first_name: data.first_name,
                last_name: data.last_name,
                gender: data.gender,
                birth_date: data.birth_date
            },
            contanct: {
                home_phone: data.home_phone,
                cell_phone: data.cell_phone,
                home_address: data.home_address,
                home_postal_code: data.home_postal_code,
                home_country: data.home_country,
                home_city: data.home_city,
            },
            job: {
                job_title: data.job_title,
                work_address: data.work_address
            }
        });

        u.save(function(err){
            if(err) return callback(utils.databaseError('User',err));
            //TODO
            //send email
            callback(null, u);
        });
    });
}

exports.User = User;
exports.create = create;