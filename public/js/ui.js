function setLocalTexts() {
    $('.multilang').each(function () {
        $(this).html(getTextForId($(this).attr('text')));
    });
}

var defPadding = 10;
var defCentralMarginTop = 50;
var defHeaderHeight = 150;
var defFooterHeight = 150;
var defHeaderMobileHeight = 100;

var defCardHeight = 350;

var animationTime = 200;

var mobile_screen = 480;
var phablet_screen = 768;
var tablet_screen = 992;
var normal_screen = 1280;

var loading_div = '<h1>Loading</h1>' + '<div class="progress progress-striped active">' + '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' + '</div>' + '</div>';

function initiate() {
    $('#loading_content_div').hide();
    $('#loading_content_div').html(loading_div);

    setupHeaderAlignement();
    setupImages();
    setupCards();
    setupFooter();
    setupUserContent();
}

function setupHeaderAlignement() {
    if ($(window).width() > phablet_screen) {
        var val;
        var setupUserSide = function () {
            if (!val) {
                setTimeout(setupUserSide, 10);
            }
            $('.header > .user-content > h3').each(function () {
                $(this).css('margin-top', val + 20);
            });
        };

        setupUserSide();
        $('.header > .bottom-aligned').each(function () {
            val = $('.header').height() - $(this).height() - defPadding;
            $(this).css('margin-top', val);
        });

        $('.header > .user-content').each(function () {
            $(this).css('height', $(this).parent().height());
        });
    } else {
        $('.header > .bottom-aligned').each(function () {
            $(this).css('margin-top', 0);
        });
        $('.header > .user-content > h3').each(function () {
            $(this).css('margin-top', 50);
        });

        $('.header > .user-content').each(function () {
            $(this).css('height', 3 * $(this).parent().height() / 4);
        });
    }



    if ($(window).width() < phablet_screen) {
        $('.menu_item').each(function () {
            $(this).css('text-align', 'center');
            $(this).addClass('grey_dark_bg');
        });
        $('.logo').css('margin-top', ($('.header').height() - $('.logo').height()) / 8);
    } else {
        $('.menu_item').each(function () {
            $(this).css('text-align', 'left');
            $(this).removeClass('grey_dark_bg');
        });
    }
}

function setupImages() {
    $("img").one('load', function () {
        setupFooter();
        setupUserContent();
    }).each(function () {
        if (this.complete) $(this).load();
    });

    $("img").each(function () {
        if ($(window).width() < phablet_screen) {
            console.log('Lalala');
            $(this).width($(this).attr('full-size') * 0.85);
        } else {
            $(this).width($(this).attr('full-size'));
        }
    });
    if ($(window).width() < phablet_screen) {
        $('.logo').width($('.logo').attr('full-size') * 0.5);
    }
}

function setupCards() {
    $('.card').each(function(){
        if($(this).height() < defCardHeight){
            $(this).height(defCardHeight);
        }
    });
}

function setupUserContent() {
    $('#user_content').height($('#content').height());
}

function onContentChangeStart(callback) {
    $('.central').fadeOut(animationTime, function () {
        $('.footer').hide();
        $('#loading_content_div').fadeIn(animationTime);
        if (callback) {
            callback();
        }
    });
}

function onContentChangeEnd(callback) {
    $('#loading_content_div').hide();
    $('.central').fadeIn(animationTime, function () {
        if (callback) {
            callback();
        }
        setupFooter();
        $('.footer').fadeIn(animationTime, function () {
            if ($(window).width() < phablet_screen) {
                $(window).scrollTop($('#content').position().top);
            }

            setupUserContent();
        });
    });
}

function setupFooter() {
    var centralMarginTop = defCentralMarginTop;
    if ($(window).width() < normal_screen) {
        centralMarginTop = 0;
    }

    $('.footer').each(function () {
        var margin_top;
        var this_height = $('.header').height();

        //If the whole page can be complitely shown on one page...
        if ($(window).height() - $('.header').height() - centralMarginTop - $('#content').height() - this_height > 0) {
            margin_top = $(window).height() - $('.header').height() - $('#content').height() - this_height - centralMarginTop + 10;
        } else {
            margin_top = centralMarginTop;
        }
        $(this).css('margin-top', margin_top);
    });
}