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

function initiate() {
    console.log('Initiation of UI');
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
            $('.user-space-support > h3').each(function(){
                $(this).css('margin-top', val+20);
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

    setupFooter();
}

function setupFooter() {
    console.log('Setting up .footer');

    var centralMarginTop = defCentralMarginTop;
    if ($(window).width() < 1200) {
        centralMarginTop = 0;
    }
    $('.footer').each(function () {
        var margin_top = $(window).height() - ($('#content').height() + $('.header').height() + $(this).height() + centralMarginTop - 10)
        if (margin_top < 0) {
            margin_top = 0;
        }
        console.log($(window).height() + ' - (' + $('#content').height() + '+' + $('.header').height() + '+' + $(this).height() + '+' + centralMarginTop + '-' + 10 + ')');
        console.log('margin-top: ' + margin_top);
        $('.footer').css('margin-top', margin_top);
    });
}