function setLocalTexts() {
    $('.multilang').each(function () {
        $(this).html(getTextForId($(this).attr('id')));
    });
}

var defPadding = 10;
var defCentralMarginTop = 50;
var defHeaderHeight = 150;
var defHeaderMobileHeight = 100;
var newLang;

function initiate() {
    console.log('Initiation of UI');
    if (current_lang === 'fr') {
        newLang = 'en';
    } else if (current_lang === 'en') {
        newLang = 'fr';
    }
    
    console.log('Setting up .link');
    $('.link').css('cursor', 'pointer');

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

    console.log('Setting up .mobile_login');
    $('.mobile_login').each(function () {
        $(this).css('height', defHeaderMobileHeight);
    });

    console.log('Setting up .footer');
    $('.footer').each(function () {
        if ($('.central').height() + $('.header').height() + $(this).height() + defCentralMarginTop < $(window).height()) {
            $('.footer').css('margin-top', $(window).height() - ($('.central').height() + $('.header').height() + $(this).height() + defCentralMarginTop));
        }
    });
}