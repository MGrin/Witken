var passRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
var user = §§-JSON.stringify(user);§;

var onDataLoaded = function() {
    var passwd_chk = function(pwd, pwd_rpt) {
        if (!passRE.test(pwd)) {
            return 'Wrong password format';
        }

        if (pwd !== pwd_rpt) {
            return 'Passwords are differents';
        }

        return undefined;
    }

    $('#sign_up_submit_btn').click(function() {
        var passwd = $('#password').val();
        var passwd_rpt = $('#password_repeat').val();

        var test_res = passwd_chk(passwd, passwd_rpt);

        $('#error_div').text('');
        $('#pwd_div').removeClass('has-error');
        $('#pwd_rpt_div').removeClass('has-error');

        if (test_res) {
            $('#error_div').text(test_res);
            $('#pwd_div').addClass('has-error');
            $('#pwd_rpt_div').addClass('has-error');
        } else {
            var params = {};
            params.user = user;
            params.pass = CryptoJS.SHA1(passwd).toString();

            $('#sign_up_form').block({
                message: 'Loading'
            });
            $.post('/signup', params, function() {
                console.log('post /auth');
            }).success(function(data){
                if (data.err) {
                    $('#error_div').text(data.err.error_message);
                    $('#pwd_div').addClass('has-error');
                    $('#pwd_rpt_div').addClass('has-error');
                } else {
                    pwd = params.pass;

                    $.post('/auth', {
                        username: user.email,
                        password: pwd
                    }, function(data) {
                        $('#sign_up_form').unblock();
                        if (data.err) {
                            document.location.href = document.location.origin + '/inscription' + '?lang=' + current_lang;
                        } else if (data.redirect) {
                            document.location.href = document.location.origin + data.redirect.path + '?lang=' + current_lang;
                        }
                    });
                }
            }).fail(function(){
                alert('Server faled');
            });
        }
    });
};