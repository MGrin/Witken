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
        animation_time = 300,
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
    var min_height = $('.body_wrapper').height() + 50 + parseInt($('.footer_wrapper').css('padding-top'));
    footerPosition();
    $(window).resize(function(){
        footerPosition();
        });

    function footerPosition(){
        var new_height = $(window).height() - $('footer').height();
        $('.body_wrapper').height((new_height <= min_height) ? min_height : new_height);
    }

    $(window).scroll(function(){

        if($(document).scrollTop() > 0 && $(window).width() > min_window_width && (document.location.pathname) != '/' && enabled)
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
                $('.user-content p').css('display', 'none');

                if(user==='None' || user === undefined){
                    $('.user-content h3').removeClass("menu_item_up");
                    $('.user-content h3').stop().animate({'bottom' : "0px"}, animation_time);
                }else{
                    $('.user-content h3').addClass("menu_item_up");
                    $('.user-content h3').stop().animate({'bottom' : "13px"}, animation_time);
                }
                $('.header').css('left', ($(window).width() - $('.header').width()) / 2);
            }
        }
        else
        {
            if($('.header').data('size') == 'small')
            {
                resetHeader(full_height, animation_time);
            }
        }
    });
})

var enabled = true;

function resetHeader(full_height, animation_time){
    $('html, body').animate({scrollTop: '0px'}, animation_time);
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
    $('.user-content p').css('display', 'inline-block');
    $('.user-content h3').removeClass("menu_item_up");
    $('.user-content h3').stop().animate({'bottom' : "0px"}, animation_time);
}

function disableScroll(){
    enabled = false;
    resetHeader('150px', 300);
}

function enableScroll(){
    enabled = true;
}

function testEmail(email){
    var emailRE = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRE.test(email);
}

//Set label text with and without error
function appendElement(element, text){

    return getTextForId(element) + text;
}