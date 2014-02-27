§§
if (err !== 'None') {;§
    alert('§§-JSON.stringify(err);§');§§
};§

var emailRE = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var passRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;

var onDataLoaded = function () {
    $('#login_submit_btn').click(login);
}

var login = function () {
    var testInputData = function (email, passwd) {
        var res;

        if (!emailRE.test(email)) {
            res = {};
            res.emailError = "Wrong email format";
        }

        if (!passRE.test(passwd)) {
            if (!res) {
                res = {};
            }
            res.passwordError = "Wrong password format";
        }

        return res;
    }
    var showEmailError = function (error) {
        $('#email_sign_in').addClass('has-error');
        $('#email_error_div').text(error);
    }
    var showPasswordError = function (error) {
        $('#password_sign_in').addClass('has-error');
        $('#password_error_div').text(error);
    }

    $('#email_sign_in').removeClass('has-error');
    $('#password_sign_in').removeClass('has-error');
    $('#email_error_div').text('');
    $('#password_error_div').text('');

    var email = $('#email').val();
    var pwd = $('#password').val();

    var test_res = testInputData(email, pwd);
    if (test_res) {
        if (test_res.emailError) {
            showEmailError(test_res.emailError);
        }

        if (test_res.passwordError) {
            showPasswordError(test_res.passwordError);
        }
    } else {
        pwd = CryptoJS.SHA1(pwd).toString();
        $('#login_form').block({
            message: "Loading..."
        });

        $.post('/auth', {
            username: email,
            password: pwd
        }, function (data) {
            $('#login_form').unblock();
            if (data.err) {
                if (data.err.field === 'email') {
                    showEmailError(data.err.error_message);
                } else if (data.err.field === 'pass') {
                    showPasswordError(data.err.error_message);
                } else if (data.err.field === 'general') {
                    showModalError(data.err.error_message);
                }
            } else if (data.redirect) {
                document.location.href = document.location.origin + data.redirect.path + '?lang=' + current_lang;
            }
        });
    }
}