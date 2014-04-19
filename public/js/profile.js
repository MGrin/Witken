$(document).ready(function(){

    $("#profile-menu").css({
        "width" : $(".user-content").width() + 10
    });

    $(".profile").css({
        "width" : $(".profile-wrapper").width() - $("#profile-menu").width(),
        "height" : $("#profile-menu").height()
    });

});