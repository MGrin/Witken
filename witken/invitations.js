var utils;
var user;
var email;
var invitations_db;

var mongoose = require('mongoose');

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

var invitationSchema = mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    user: Object,
    invitation: {
    	type: Object
    },
    registered: {
    	type: Boolean,
    	default: false
    }
});

var Invitation = mongoose.model('Invitation', invitationSchema, 'invitation');

var invite = function(invitation, us, callback){
	user.User.findOne({email: invitation.email}, function(err, u){
		if(err){
			return callback(utils.generateDatabaseError('User', err));
		}
		if(u){
			return callback(utils.generateInputError('email', 'User '+us.email+' already registered!'));
		}
		
		Invitation.findOne({invitation: invitation}, function(err, invit){
			if(err){
				return callback(utils.generateDatabaseError('Invitation', err));
			}else if(invit){
				return callback(utils.generateInputError('email', 'Already invited by '+invit.user.human_data.first_name));
			}else{
				inv = new Invitation({
					date: new Date(),
					user: us.generateShortObject(),
					invitation: invitation,
					registered: false
				});
				us.addInvitation(inv);
				inv.save();
				email.sendInvitation(invitation.email);
				return callback();
			}
		});
	});
}

var updateInvitation = function(invitation, callback){
	if(!invitation.email){
		if(callback){
			return callback(utils.generateDatabaseError('Invitation', 'Wrong invitation format!'));
		}
		throw new Error('Wrong invitation format!');
	}
	Invitation.findOne({invitation: invitation}, function(err, inv){
		if(err){
			if(callback){
				return callback(err);
			}
			throw err;
		}
		if(inv){
			inv.registered = true;
			user.User.findOne({
				email: inv.email
			}, function(err, u){
				if(!err && u){
					u.notifyByEmail('invitation', inv);
				}
			})
			inv.save();
			if(calback){
				return callback();
			}
		}
	});
}

exports.init = init;
exports.Invitation = Invitation;
exports.invite = invite;