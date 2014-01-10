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

var animationTime = 200;

function initiate() {
    $('#loading_content_div').hide();
    if ($(window).width() > 970) {
        var val = undefined;
        $('.bottom-aligned').each(function () {
            val = $('.header').height() - $(this).height() - defPadding;
            $(this).css('margin-top', val);
        });
        var setupUserSide = function () {
            if (!val) {
                setTimeout(setupUserSide, 10);
            }
            $('.user-space-support > h3').each(function () {
                $(this).css('margin-top', val + 20);
            })
        };

        setupUserSide();
    }

    $('.user-space-support').each(function () {
        $(this).css('height', $(this).parent().height());
    });
    $('.mobile_login').each(function () {
        $(this).css('height', defHeaderMobileHeight);
    });

    $("img").one('load', function () {
        setupFooter();
    }).each(function () {
        if (this.complete) $(this).load();
    });

    setupFooter();
}

function onContentChangeStart(callback) {
    $('#content').fadeOut(animationTime, function () {
        var centralMarginTop = defCentralMarginTop;
        if ($(window).width() < 1200) {
            centralMarginTop = 0;
        }
        setupFooter();
        $('#loading_content_div').fadeIn(animationTime, function () {
            setupFooter();
        });
        if (callback) {
            callback();
        }
    });
}

function onContentChangeEnd(callback) {
    $('#loading_content_div').hide();
    setupFooter();
    $('#content').fadeIn(animationTime, function () {
        if (callback) {
            callback();
        }
        setupFooter();
    });
}

function setupFooter() {
    var centralMarginTop = defCentralMarginTop;
    if ($(window).width() < 1200) {
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