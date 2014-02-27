var onDataLoaded = function () {
    bindOnClickEventForContentClass('.js_redirect_label', '/label', 'Label');
    bindOnClickEventForContentClass('.js_redirect_profile', '/profile', 'Profile');

    if ($(window).width() > phablet_screen) {
        $('.index_footer > div:first').addClass('right_border');
        $('.index_footer > div:nth-child(3)').addClass('left_border');
        $('.item > .bottom-aligned').each(function () {
            var calculateMtop = function (element) {
                var mtop = $('.item > img').height() - $(element).height() - 50;
                if (mtop < 0) {
                    setTimeout(function () {
                        calculateMtop(element);
                    }, 10);
                } else {
                    $(element).css('margin-top', mtop);
                }
            }
            calculateMtop(this);
        });
    }
    $('.index_footer').each(function () {
        $(this).css('width', $('#index_carousel').css('width'));
    });

    $('.index_footer > #labels').height($('.index_footer > #results').height());
}