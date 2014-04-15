$(document).ready(function(){

    //Set phone format
    $(".phone").mask("+ (99) 99-999-99-99");

    //Set birthday format and enable date picker
    $("#birthday").mask("99/99/9999");
    $("#birthday").datepicker({ dateFormat: 'dd/mm/yy', changeYear: true, yearRange: "1920:2012"});

    //Enable list of jobs autocomplete
    $("#job_title").autocomplete({
        source: selectArray('.js-select-sector'),
        minLength:0
    }).focus(function(){
            //Use the below line instead of triggering keydown
            $(this).autocomplete("search");
        }).autocomplete("widget").addClass("fixed-height");

    //Enable list of countries autocomplete
    $("#country").autocomplete({
        source: selectArray('.js-select-country'),
        minLength:0
    }).focus(function(){
            //Use the below line instead of triggering keydown
            $(this).autocomplete("search");
        }).autocomplete("widget").addClass("fixed-height");

    //Enable button set
    $(".cb-enable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-disable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', true);
    });
    $(".cb-disable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-enable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', false);
    });

    //Check password for length
    $("#password").change(function(){

        var password = $("#password").val();
        var password_v = $("#password_v").val();

        if(password.length > 7)
        {
            $(".signup_password").html(getTextForId('signup_password'));
            $("#password").removeClass('error').addClass("normal");

        }
        else
        {
            $(".signup_password").html(appendElement("signup_password", ' - <span style="color: red">The password should have at least <strong>8</strong> characters</span>'));
            $("#password").removeClass('normal').addClass("error");
        }
    });

    //Check password match
    $("#password_v").change(function(){

        var password = $("#password").val();
        var password_v = $("#password_v").val();

        if(password_v != password)
        {
            $(".signup_password_repeat").html(appendElement('signup_password_repeat', ' - <span style="color: red">The passwords don\'t match</span>'));
            $("#password_v").removeClass('normal').addClass("error");
        }else{
            $(".signup_password_repeat").html(getTextForId('signup_password_repeat'));
            $("#password_v").removeClass('error').addClass("normal");
        }

        if(password == "" || password == null)
        {
            $("#status_pv").html('<span style="color: red">Fill in the password field first</span>');
            $("#password_v").removeClass('object_ok'); // if necessary
            $("#password_v").addClass("object_error");
        }
    });

    //Check email for format
    $("#email").change(function() {

        var email = $("#email").val();
        var emailRE = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(email == ''){
            $("#email").removeClass('normal').addClass("error");
        }
        else if(!emailRE.test(email)){
            $(".signup_email").html(appendElement("signup_email",' - <span style="color: red">Wrong email format</span>'));
            $("#email").removeClass('normal').addClass("error");
        }else{
            $(".signup_email").html(getTextForId("signup_email"));
            $("#email").removeClass('error').addClass("normal");
        }
    });

    //Check birthday for format
    $('#birthday').change(function(){

        var elements = $('#birthday').val().split('/');

        if(0 < elements[0] && elements[0] <= 31 && 0 < elements[1] && elements[1] <= 12 &&
            1919 < elements[2] && elements[2] <= new Date().getFullYear()){
            $(".signup_birtday").html(getTextForId("signup_birtday"));
            $("#birthday").removeClass('error').addClass("normal");
        }else{
            $(".signup_birtday").html(appendElement("signup_birtday",' - <span style="color: red">Your birthday is out of range</span>'));
            $("#birthday").removeClass('normal').addClass("error");
        }
    })

    //Check zip code for length not exceeding and force numeric only
    $("#home_zip").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('#home_zip').change(function(){

        if($('#home_zip').val().length <= 10){
            $(".signup_contact_home_postal_code").html(getTextForId("signup_contact_home_postal_code"));
            $("#home_zip").removeClass('error').addClass("normal");
        }else{
            $(".signup_contact_home_postal_code").html(appendElement("signup_contact_home_postal_code",' - <span style="color: red">ZIP Code is too long</span>'));
            $("#home_zip").removeClass('normal').addClass("error");
        }
    })

    $('input').change(function(){

        ($(this).val != '')
            $(this).removeClass('error').addClass("normal");
    })


        $("#register_form").submit(function(e) {
        e.preventDefault();

        //console.log($( "input[type=radio]:checked").val());
        emptyFields();

        if(document.getElementsByClassName('error').length > 0 && !emptyFields()){

            $(".prevent_submit").html("The registration form is not complete").show().fadeOut(2000);
            return false; //prevent the submission to go through
        }else{
            var pwd = $(this).find('input[name="password"]').val();
            $(this).find('input[name="password"]').val(CryptoJS.SHA1(pwd).toString());

            $.post('/signup', $(this).serialize(), function (data) {
                $('#register_form').unblock();
                
                if (data.err) {
                    //TO DO
                } else if (data.redirect) {
                    document.location.href = document.location.origin + data.redirect.path + '?lang=' + current_lang;
                }
            });
            return true;
        }
    });

    //Set label text with and without error
    function appendElement(element, text){

        return getTextForId(element) + text;
    }

    function emptyFields(){
        var empty = true;

        $("input").each(function() {

            if($(this).val() == ''){
                $(this).removeClass('normal').addClass("error");
                empty = false;
            }else{
                $(this).removeClass('error').addClass("normal");
            }
        })

        return empty;
    }
});