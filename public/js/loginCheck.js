$(document).ready(function(){

    $("input").each(function() {
            $(this).val(sessionStorage.getItem($(this).attr('name')));
    })

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
        var passRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;

        if(email == ''){
            $("#email").removeClass('normal').addClass("error");

        } else if (!testEmail(email)) {
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
        sessionStorage.setItem($('#email').attr('name'), email);
        sessionStorage.setItem($('#password').attr('name'), pwd);
        pwd = CryptoJS.SHA1(pwd).toString();
        $.ajax({
            url: '/auth',
            type: "post",
            data: {
                username: email,
                password: pwd
            } ,
            success: function(data) {
                if (data.field === 'email') {
                    $(".login_email").html(appendElement("login_email",getTextForId("login_error_email_missing")));
                    $("#email").removeClass('normal').addClass("error");
                } else if (data.field === 'password') {
                    $(".login_password").html(appendElement("login_password",getTextForId("login_error_password")));
                    $("#password").removeClass('normal').addClass("error");
                } else if (data.field === 'general') {
                    errorNoty('General Server Error');
                } else if (data.redirect) {
                    document.location.href = document.location.origin + data.redirect.path + '?lang=' + current_lang;
                }
            },
            error: function(data) {
                errorNoty('General Server Error');
            }
        });
    }
}

function errorNoty(text){
    var l = noty({
        text: text,
        type: 'error',
        dismissQueue: true,
        layout: 'bottomLeft',
        theme: 'defaultTheme'
    });

    setTimeout(function(){l.close()}, 2500);
}