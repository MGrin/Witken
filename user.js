var mongoose = require('mongoose');

var witken_users = 'mongodb://witkenDB:usersDB2013WitKen@ds057538.mongolab.com:57538/witken_users'

mongoose.connect(witken_users);
var db = mongoose.connection;
db.on('error', function () {
    console.log('Failed to connect to DB');
    process.exit(1);
});
db.once('open', function callback() {
    console.log('Connected to DB');
});

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    human_data: {
        name: String,
        familly_name: String
    },
    meta: {
        email_verified: {
            type: Boolean,
            default: false
        },
        registration: {
            type: Date,
            default: Date.now
        }
    },
    labels: {
        obtained: {
            type: Boolean,
            default: false
        }
    }
});

userSchema.methods.validPassword = function (p) {
    return p === this.password;
}

var User = mongoose.model('User', userSchema);

exports.createNewUser = function (email, pass, callback) {
    User.find({
        email: email,
        password: pass
    }, function (err, results) {
        if (err) {
            return callback(err);
        }
        if (results.length == 0) {
            var u = new User({
                email: email,
                password: pass,
                human_data: {
                    name: 'Test',
                    familly_name: 'User'
                }
            });
            u.save(function (err, us) {
                return callback(err, us);
            });
        } else {
            return callback(null, false);
        }
    });

}

exports.findOne = function (query, callback) {
    console.log('User.findOne called with query ' + JSON.stringify(query));
    User.find(query, function (err, users) {
        console.log('Result: err=' + err + ', users=' + JSON.stringify(users));
        if (err) {
            return callback(err);
        }
        if (users.length === 0) {
            return callback(err, null);
        }
        if (users.length > 1) {
            return callback('More than one user with the same ' + JSON.stringify(query));
        }
        return callback(null, users[0]);
    });
}

if (require('./server.js').mode === 'DEV') {
    var testUser = exports.createNewUser('test@test.com', '123qweQWE', function (err, u) {
        if (err) {
            return console.log('Failed to create user ' + 'test@test.com');
        }
        if (!u) {
            return console.log('User ' + 'test@test.com' + ' exists');
        }

        if (u) {
            return console.log('User ' + u.email + ' created!');
        }
    });
}