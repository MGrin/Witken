$(document).ready(function(){
    var demo1 = $("#carousel").slippry({
        transition: 'horizontal',
        useCSS: true,
        speed: 1000,
        pause: 5000,
        auto: true,
        preload: 'visible'
    });

    $('.stop').click(function () {
        demo1.stopAuto();
    });

    $('.start').click(function () {
        demo1.startAuto();
    });

    $('.prev').click(function () {
        demo1.goToPrevSlide();
        return false;
    });
    $('.next').click(function () {
        demo1.goToNextSlide();
        return false;
    });
    $('.reset').click(function () {
        demo1.destroySlider();
        return false;
    });
    $('.reload').click(function () {
        demo1.reloadSlider();
        return false;
    });
    $('.init').click(function () {
        demo1 = $("#carousel").slippry();
        return false;
    });

    $('.discover').click(function () {
        location.href = '/label' + '?lang=' + current_lang;
    });

    $('.menu_item').width(1100 / 8);
    $('.menu_item').first().width(235);
    $('.index_footer').children(".link").css({
        width : $('.index_footer').width() / 3
    });
    $('.link_icon').css({
        bottom : 50% - 28
    });
    var min_height = $('.body_wrapper').height() + parseInt($('.footer_wrapper').css('padding-top'));
    footerPosition();
    $(window).resize(function(){
        footerPosition();
        });

    function footerPosition(){
        var new_height = $(window).height() - $('footer').height();
        $('.body_wrapper').height((new_height <= min_height) ? min_height : new_height);
    }
})