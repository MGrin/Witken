var utils;
var user;
var label_db;

var mongoose = require('mongoose');

var init = function(_utils, _user, _db, error_callback, success_callback) {
    if (!_utils || !_user || !_db || !error_callback || !success_callback) {
        throw 'Wrong arguments exception!';
        return;
    }
    utils = _utils;
    user = _user;
    label = _db;

    mongoose.connect(label_db);
    var db = mongoose.connection;

    db.on('error', function() {
        return error_callback('Failed to connect to Label DB');
    });
    db.once('open', success_callback);
}

var labelSchema = mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    user: Object,
    id: Number,
    results: Object
});

exports.init = init;