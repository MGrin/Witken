$(document).ready(function(){

    $("#profile-menu").css({
        "width" : $(".user-content").width() + 10
    });

    $(".profile").css({
        "width" : $(".profile-wrapper").width() - $("#profile-menu").width(),
        "height" : $("#profile-menu").height()
    });

    $(".confirm_block").width($(".profile_status").width() + $(".profile_confirm").width() + 5);
    $(".indexation_block_right").width($(".inner-wrapper").width() - $(".indexation_block_left").width() - parseInt($(".indexation_block_right").css("marginBottom")) * 2 - 6);
});