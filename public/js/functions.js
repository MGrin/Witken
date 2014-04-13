$(document).ready(function(){
    var demo1 = $("#carousel").slippry({
        transition: 'horizontal',
        useCSS: true,
        speed: 1000,
        pause: 5000,
        auto: true,
        preload: 'visible'
    });

    var full_height = '150px',
        small_height = '75px',
        animation_time = 500,
        min_window_width = 1100;

    $('.header').data('size','full');

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

    $('.header').css('left', ($(window).width() - $('.header').width()) / 2);
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

    $(window).scroll(function(){
        if($(document).scrollTop() > 0 && $(window).width() > min_window_width)
        {
            if($('.header').data('size') == 'full')
            {
                $('.header').data('size','small');
                $('.header, .index_header').css('position', 'fixed');
                $('.header').stop().animate({
                    height : small_height
                },animation_time);
                $('.menu_item').stop().animate({
                    "padding-top" : "3px",
                    "height" : small_height
                }, animation_time);
                $('.index_header, .logo').stop().animate({'height' : small_height}, animation_time);
                $('.menu_item small').css('display', 'none');
                $('.header').css('left', ($(window).width() - $('.header').width()) / 2);
            }
        }
        else
        {
            if($('.header').data('size') == 'small')
            {
                $('.header').data('size','full');
                $('.header, .index_header').css('position', 'static');
                $('.header').stop().animate({
                    height : full_height
                },animation_time);
                $('.menu_item').stop().animate({
                    "padding-top" : "45px",
                    "height" : full_height
                }, animation_time);
                $('.index_header, .logo').stop().animate({'height' : full_height}, animation_time);
                $('.menu_item small').css('display', 'block');
            }
        }
    });
})