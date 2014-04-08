var utils;
var user;
var email;
var invitations_db;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var init = function(_utils, _user, _email, _db, error_callback, success_callback) {
    if (!_utils || !_user || !_db || !error_callback || !success_callback) {
        throw 'Wrong arguments exception!';
        return;
    }
    utils = _utils;
    user = _user;
    email = _email;
    invitations_db = _db;

    mongoose.connect(invitations_db);
    var db = mongoose.connection;

    db.on('error', function() {
        return error_callback('Failed to connect to Label DB');
    });
    db.once('open', success_callback);
}

var invitationSchema = Schema({
    date: {
        type: Date,
        default: new Date()
    },
    user: Object,
    invitation: Object,
    registered: {
    	type: Boolean,
    	default: false
    }
});

var Invitation = mongoose.model('Invitation', invitationSchema, 'invitation');


exports.init = init;
exports.Invitation = Invitation;
