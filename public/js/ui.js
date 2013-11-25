var defPadding = 10;
var defCentralMarginTop = 50;

function initiate() {
    console.log('Initiation of UI');

    console.log('Setting up all .bottom-aligned');
    if ($(window).width() > 970) {
        $('.bottom-aligned').each(function () {
            $(this).css('margin-top', $('.header').height() - $(this).height() - defPadding)
        });
    }

    console.log('Setting up all .user-space-support');
    $('.user-space-support').each(function () {
        $(this).css('height', $(this).parent().height());
    });

    console.log('Setting up .footer');
    $('.footer').each(function () {
        if ($('.central').height() + $('.header').height() + $(this).height() + defCentralMarginTop < $(window).height()) {
            $('.footer').css('margin-top', $(window).height() - ($('.central').height() + $('.header').height() + $(this).height() + defCentralMarginTop));
        }
    });
}