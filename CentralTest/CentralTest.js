var soap = require('soap');
var client;
var utils;

var CENTRAL_TEST_WSDL_URL = 'http://v2.centraltest.com/CT_WS_partner.wsdl';

var CT_SESSION_KEY;

var init = function (_utils, error_callback, success_callback) {
	if (!_utils || !error_callback || !success_callback) {
        throw 'Wrong arguments exception!';
        return;
    }
    utils = _utils;

    soap.createClient(CENTRAL_TEST_WSDL_URL, function (err, _client) {
		if (err) return error_callback(err);
		client = _client;

		login(function (err, session_key) {
			if (err) return error_callback(err);
			CT_SESSION_KEY = session_key;
			success_callback();
		});		
	});
	
}


var login = function (cb) {
	client.CT_Login({username: 'xww26ti', password: 'yu6z4de'}, function (err, result) {
		if (!err && result) console.log('CT Login with session: '+result.result);
		return cb(err, result.result);
	});
}

var generate_CT_WS_Candidate = function (user, CT_group) {
	return {
		group: CT_group,
		surname: user.human_data.last_name,
		firstname: user.human_data.first_name,
		email: user.email,
		birth: user.human_data.birth_date.getFullYear(),
		gender: (user.human_data.prefix === 'mr')?'H':'F',
		is_showReport: 0
	}
}

var generate_CT_WS_Test = function (test_id, test_lang) {
	return {
		testId: test_id,
		testLanguage: test_lang
	}
}

var addCandidate = function (user, cb) {
	client.CT_AddCandidate({
		session_id: CT_SESSION_KEY,
		candidate: generate_CT_WS_Candidate(user, 'Witke Test Candidate')
	}, function (err, result) {
		if (err) return cb(new utils.ServerError('CT_AddCandidate error: '+err));
		return cb(null, result.result);
	});
}

var updateCandidate = function (WS_candidate, cb) {
	client.CT_UpdateCandidate({
		session_id: CT_SESSION_KEY,
		candidateId: WS_candidate.ref_id,
		candidate: WS_candidate
	}, function (err, result) {
		if (err) return cb(new utils.ServerError('CT_UpdateCandidate error: '+err));
		return cb(null, result.result);
	});
}

var archiveCandidate = function (WS_candidate, cb) {
	client.CT_ArchiveCandidate({
		session_id: CT_SESSION_KEY,
		candidate: WS_candidate
	}, function (err, result) {
		if (err) return cb(new utils.ServerError('CT_ArchiveCandidate error: '+err));
		return cb(null, result.result);
	});
}

var restoreCandidate = function (WS_candidate, cb) {
	client.CT_ArchiveCandidate({
		session_id: CT_SESSION_KEY,
		candidate: WS_candidate
	}, function (err, result) {
		if (err) return cb(new utils.ServerError('CT_RestoreCandidate error: '+err));
		return cb(null, result.result);
	});
}

var getCandidateLoginLink = function (WS_candidate, cb) {
	client.CT_GetCandidateLoginLink({
		session_id: CT_SESSION_KEY,
		candidateId: WS_candidate.ref_id
	}, function (err, result) {
		if (err) return cb(new utils.ServerError('CT_getCandidateLoginLink error: '+err));
		return cb(null, result.result);
	});
}

var deleteCandidate = function (WS_candidate, cb) {
	client.CT_DeleteCandidate({
		session_id: CT_SESSION_KEY,
		candidate: WS_candidate
	}, function (err, result) {
		if (err) return cb(new utils.ServerError('CT_DeleteCandidate error: '+err));
		return cb(null, result.result);
	});
}

var hasCandidatePendingTest = function (WS_candidate, WS_test, cb) {
	client.CT_HasCandidatePendingTest({
		session_id: CT_SESSION_KEY,
		candidateId: WS_candidate.ref_id,
		test: WS_test
	}, function (err, result) {
		if (err) return cb(new utils.ServerError('CT_HasCandidatePendingTest error: '+err));
		return cb(null, result.result);
	});
}

var inviteCandidate = function (user, test_id, test_lang, cb) {
	var WS_candidate = user.CentralTest;
	var WS_test = generate_CT_WS_Test(test_id, test_lang);

	client.CT_InviteCandidate({
		session_id: CT_SESSION_KEY,
		candidateId: WS_candidate.ref_id,
		test: WS_test,
		is_email: 0
	}, function (err, result) {
		if (err) return cb(new utils.ServerError('CT_getCandidateLoginLink error: '+err));
		return cb(null, result.result);
	});
}
exports.init = init;
exports.login = login;

exports.candidate = {};
exports.candidate.generate_CT_WS = generate_CT_WS_Candidate;
exports.candidate.add = addCandidate;
exports.candidate.update = updateCandidate;
exports.candidate.archive = archiveCandidate;
exports.candidate.restore = restoreCandidate;
// exports.candidate.delete = deleteCandidate;
exports.candidate.getLoginLink = getCandidateLoginLink;
exports.candidate.hasPendingTest = hasCandidatePendingTest;

exports.test = {
	COM_R: {
		id: 141,
		lang: {
			fr: 'FR',
			qc: 'QC'
		}
	}
};
exports.test.invite = inviteCandidate;