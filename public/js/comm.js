function setupOnClickEvents() {
    $('#logo').click(function () {
        var href = '/?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Index', href);
        });
    });

    //Binding events depending on text

    $('.js_redirect_label').click(function () {
        var href = '/label?lang=' + current_lang
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Label', href);
        });
    });

    $('.js_redirect_examen').click(function () {
        var href = '/examen?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Examen', href);
        });
    });

    $('.js_redirect_witken').click(function () {
        var href = '/witken?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Witken', href);
        });
    });

    $('.js_redirect_register').click(function () {
        var href = '/inscription?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Witken - Inscription', href);
        });
    });
    
    $('.js_redirect_profile').click(function () {
        var href = '/profile?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Witken - Profile', href);
        });
    });

    $('.js_redirect_logout').click(function () {
        document.location.href = document.location.origin + '/logout' + '?lang=' + current_lang;
    });

    if (current_lang === 'fr') {
        newLang = 'en';
    } else if (current_lang === 'en') {
        newLang = 'fr';
    }

    $('.js_redirect_language').click(function () {
        document.location.href = document.location.origin + document.location.pathname + '?lang=' + newLang;
    });
}

if (!onDataLoaded) {
    var onDataLoaded = function () {};
}

function bindOnContentReceiveEvent(content, name, pathname) {
    $('#content').html(content);

    window.history.pushState(content, name, pathname);

    $(document).ready(function () {
        onDataLoaded();
        setLocalTexts();
        setupFooter();
    });

    if ($(window).width() < 970) {
        $(window).scrollTop($('#content').position().top)
    }
}