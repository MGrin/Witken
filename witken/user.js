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
    online_test: Object,
    online_test_done: {type: Boolean}
});

userSchema.methods.validPassword = function(p) {
    //TODO is called on each login, so we can check for the online test date
    var selled_hash = userTools.generateHashedPassword(this, p);
    console.log('Password validation for user ' +this.email+": "+selled_hash+" === "+this.password);
    return selled_hash === this.password;
}

userSchema.methods.startOnlineTest = function (cb) {
    if (this.online_test && !this.online_test.done ) {
        //TODO Test was already started, need to restart??
        //Check the start time and delete user or redirect to a test
        //For now - redirect to a new test, so no changes in database
        cb();
    } else {
        // Test is starting for the first time
        this.online_test = {
            start_date: new Date()
        }
        this.online_test_done = false;
        this.save(cb);
    }
}

userSchema.methods.isOnlineTestDone = function () {
    return this.online_test && this.online_test_done;
}

userSchema.methods.stopOnlineTest = function (testData, cb) {
    if(!testData) throw new Error('BAD THING');
    this.online_test_done = true;
    //TODO send data to CentralTest
    this.save(cb);
}

userSchema.methods.generatePublicObject = function() {
    return {
        email: this.email,
        job: this.job,
        contact: this.contact,
        human_data: this.human_data
    }
}

var User = mongoose.model('User', userSchema, 'users');

var checkParams = function (data, cb) {
    //TODO
    return cb();
}

var create = function(data, callback){
    checkParams(data, function(err){
        if(err) return callback(err);
        console.log(data);
        var birthdaySplit = data.birthday.split('/');
        var birthdayDate = new Date(birthdaySplit[2], birthdaySplit[1]-1, birthdaySplit[0]);
        var u = new User({
            email: data.email,
            password: data.password,
            human_data: {
                prefix: data.title,
                first_name: data.name,
                last_name: data.surname,
                gender: data.gender,
                birth_date: birthdayDate
            },
            contact: {
                home_phone: data.home_phone,
                cell_phone: data.cell_phone,
                home_address: data.home_address,
                home_postal_code: data.home_zip,
                home_country: data.country,
                home_city: data.city,
            },
            job: {
                job_title: data.job_title,
                work_address: data.job_address
            }
        });
        u.password = userTools.generateHashedPassword(u, data.password);
        u.save(function(err){
            if(err) return callback(new utils.DatabaseError('User',err));
            //TO DO
            //send email
            callback(null, u);
        });
    });
}

exports.User = User;
exports.create = create;
exports.userTools = userTools;