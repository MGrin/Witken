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

function initiate() {
    $(document).width($(window).width());

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
}

function setupCards() {
    $('.card').each(function () {
        if ($(this).height() < defCardHeight) {
            $(this).height(defCardHeight);
        }
    });

    $('.card-wrapper').children().each(function (index, element) {
        if ($(element).hasClass('card')) {
            if (index === 0) {
                $(element).addClass('black_light_bg');
                $(element).addClass('white_text');
            } else if (index % 2 === 0) {
                $(element).addClass('grey_dark_bg');
            } else {
                $(element).addClass('grey_light_bg');
            }
        }
    });
}

function setupWitkenCircleControls() {
    $('.circle_control').each(function () {
        $(this).height($(this).width());
        $(this).children().css('margin-top', $(this).height() / 2 - $(this).children().height() / 2);
        if (!$(this).hasClass('no-hover')) {
            $(this).hover(function () {
                if (!$(this).hasClass('active')) {
                    $(this).css('background-color', 'rgb(100,100,100)');
                } else {
                    $(this).css('background-color', 'rgb(91, 151, 40)');
                }
            }, function () {
                if (!$(this).hasClass('active')) {
                    $(this).css('background-color', 'rgb(48,49,53)');
                } else {
                    $(this).css('background-color', 'rgb(71, 131, 20)');
                }
            });
        }
    });
}

function setupUserContent() {
    $('#content > #user_side').height($('#content').height());
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

function onContentChangeStart(callback) {
    $('#central').fadeOut(animationTime, function () {
        $('.footer').hide();
        if (callback) {
            callback();
        }
    });
}

function onContentChangeEnd(callback) {
    $('#central').fadeIn(animationTime, function () {
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

var generateTextCircle = function (text, cl) {
    return '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6"><div class="link circle_control text-center ' + cl + '">' + '<p class="white_text">' + text + '</p>' + '</div></div>'
}

var generateSelectorCircleWithId = function (id) {
    return '<div class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3"><div class="circle_control text-center no-hover date">' + '<select id="' + id + '">' + '</select>' + '</div></div>'
}