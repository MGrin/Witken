$(document).ready(function(){

    $('#login_submit_btn').click(onLoginClicked);

    $("input").change(function() {

        if($(this).val() == ''){

            $(this).removeClass('normal').addClass("error");
        }else if(!$(this).hasClass('error')){

            $(this).removeClass('error').addClass("normal");
        }
    });
});

var onLoginClicked = function () {
    var testInputData = function (email, passwd) {
        var res;
        var emailRE = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var passRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;

        if(email == ''){
            $("#email").removeClass('normal').addClass("error");

        } else if (!emailRE.test(email)) {
            res = {};
            res.emailError = "Error email";
            $(".login_email").html(appendElement("login_email",getTextForId("login_error_email")));
            $("#email").removeClass('normal').addClass("error");
        }else{

            $(".login_email").html(getTextForId("login_email"));
            $("#email").removeClass('error').addClass("normal");
        }

        if(passwd == ''){
            $("#password").removeClass('normal').addClass("error");

        }else if (!passRE.test(passwd)) {

            res = {};
            res.passwordError = "Error password";
            $(".login_password").html(appendElement("login_password",getTextForId("login_error_password")));
            $("#password").removeClass('normal').addClass("error");
        }else{

            $(".login_password").html(getTextForId("login_password"));
            $("#password").removeClass('error').addClass("normal");
        }
        return res;
    }

    var email = $('#email').val();
    var pwd = $('#password').val();

    //Test if email and password are of correct format
    if (!testInputData(email, pwd)) {
        pwd = CryptoJS.SHA1(pwd).toString();
        $.post('/auth', {
            username: email,
            password: pwd
        }, function (data) {
            if (data.content && data.content === 'Error') {
                if (data.field === 'email') {
                    showEmailError(data.message);
                } else if (data.field === 'pass') {
                    showPasswordError(data.message);
                } else if (data.field === 'general') {
                    showModalError(data.message);
                }
            } else if (data.redirect) {
                document.location.href = document.location.origin + data.redirect.path + '?lang=' + current_lang;
            }
        });
    }
}

//Set label text with and without error
function appendElement(element, text){

    return getTextForId(element) + text;
}