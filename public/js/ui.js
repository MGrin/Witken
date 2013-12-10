function setLocalTexts() {
    console.log('Updating text');
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
        $('.bottom-aligned').each(function () {
            $(this).css('margin-top', $('.header').height() - $(this).height() - defPadding)
        });
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
    var centralMarginTop = defCentralMarginTop;
    if ($(window).width() < 1170) {
        centralMarginTop = 0;
    }
    $('.footer').each(function () {
        if ($('.central').height() + $('.header').height() + $(this).height() + centralMarginTop < $(window).height()) {
            $('.footer').css('margin-top', $(window).height() - ($('.central').height() + $('.header').height() + $(this).height() + centralMarginTop));
        }
    });
}