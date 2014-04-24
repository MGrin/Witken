var randomstring = require("randomstring");
var crypto = require('crypto');
var mongoose = require('mongoose');

var email;
var utils;
var witken_users;
var invitation;
var CT;

exports.init = function(_utils, _email, _invitation, _CT, _db, error_callback, success_callback) {
    if (!_utils || !_email || !_CT || !_db || !error_callback || !success_callback) {
        throw 'Wrong arguments exception!';
        return;
    }
    utils = _utils;
    email = _email;
    invitation = _invitation;
    CT = _CT;

    witken_users = _db;

    mongoose.connect(witken_users);
    var db = mongoose.connection;

    db.on('error', error_callback);
    db.once('open', success_callback);
}

var userTools = {
    generateHashedPassword: function(us, pwd) {
        return crypto.createHash('sha1').update(us.password_sel + pwd + us.email).digest('base64');
    },

    generateUniqueUserID: function(us, cb) {
        var generate = function () {
            var id = Math.round(Math.random()*1000000);
            User.find({personnal_id: id}, function(err, users){
                if(err) return new utils.ServerError('Failed to verify uniqueness of new userID: '+err);
                if(users && users.length > 0) return generate();
                return cb(id);
            });
        }

        generate();
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
    personnal_id: {
        type: Number,
        default: -1
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
    CentralTest: Object,
    online_test: Object,
    online_test_done: {type: Boolean},
    online_test_results: Object,
    examen: Object,
    examen_results: Object
});

userSchema.methods.validPassword = function(p) {
    //TODO is called on each login, so we can check for the online test date
    var selled_hash = userTools.generateHashedPassword(this, p);
    console.log('Password validation for user ' +this.email+": "+selled_hash+" === "+this.password);
    return selled_hash === this.password;
}

userSchema.methods.startOnlineTest = function (lang, cb) {
    if (this.online_test && !this.online_test.done ) {
        cb(null, this);
    } else {
        // Test is starting for the first time
        var CT_TEST = CT.test.COM_R;

        var thisUser = this;

        CT.test.invite(this, CT_TEST.id, CT_TEST.lang[lang], function (err, test_url) {
            if (err) return cb(err);
            if (test_url.indexOf('Invitation already sent on') > -1) {
                //Invitation was sent to central test, but was not saved in DB
                return cb(new utils.ServerError('Invitation was sent to Centraltest, but was not saved in DB. please, contact us'));
            }
            thisUser.online_test = {
                start_date: new Date(),
                url: test_url,
                lang: lang
            }
            thisUser.online_test_done = false;
            thisUser.save(cb);
        });
    }
}

userSchema.methods.isOnlineTestStarted = function () {
    return this.online_test;
}

userSchema.methods.isOnlineTestDone = function () {
    return this.online_test && this.online_test_done;
}

userSchema.methods.stopOnlineTest = function (cb) {
    this.online_test_done = true;
    this.save(cb);
}

userSchema.methods.isRegisteredForExamen = function () {
    return true && this.examen;
}

userSchema.methods.isExamenDone = function () {
    return this.examen && this.examen.date < new Date();
}

userSchema.methods.hasExamenResults = function () {
    return this.examen && this.examen_results
}

userSchema.methods.getUserState = function () {
    var state = 0;
    if(this.isOnlineTestStarted()) state++; //1: Online test was started, but never finisheds
    if(this.isOnlineTestDone()) state++; //2: Online test done, but no examen inscription
    if(this.isRegisteredForExamen()) state++; //3: Registered for examen;
    if(this.isExamenDone()) state++; //4: Examen already passed, but results are not aviable or user was absent
    if(this.hasExamenResults()) state++; //5: Examen was done, results are in database
    return state;
}

userSchema.methods.generatePublicObject = function() {
    var state = this.getUserState();
    
    return {
        email: this.email,
        job: this.job,
        contact: this.contact,
        human_data: this.human_data,
        state: state,
        examen: this.examen,
        personnal_id: this.personnal_id
    }
}

userSchema.methods.registerForExam = function (examen, cb) {
    if (!examen) return cb(new utils.ServerError('No examen given to user.registerForExam'));
    if (this.examen) return cb(new utils.ClientError('general', 'You are already registered for an examen, please contact us.'));
    this.examen = examen.generatePublicObject();
    this.save(cb);
}

var User = mongoose.model('User', userSchema, 'users');

var checkParams = function (data, cb) {
    //TODO
    return cb();
}

var create = function(data, callback){
    checkParams(data, function(err){
        if(err) return callback(err);

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

        userTools.generateUniqueUserID(u, function(id){
            u.personnal_id = id;
            CT.candidate.add(u, function (err, CT_result) {
                if (err) return callback(err);
                u.CentralTest = CT_result;
                u.save(function(err){
                    if(err) return callback(new utils.DatabaseError('User',err));
                    //TO DO
                    //send email
                    callback(null, u);
                });
            });
        });        
    });
}

exports.User = User;
exports.create = create;
exports.userTools = userTools;