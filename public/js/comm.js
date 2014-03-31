function setupOnClickEvents() {

    var links = {

        '.js_redirect_index' : '/',
        '.js_redirect_label' : '/label',
        '.js_redirect_examen' : '/examen',
        '.js_redirect_witken' : '/witken',
        '.js_redirect_login' : '/login',
        '.js_redirect_profile' : '/profile'

    }

    for(var link in links) bindOnClickEventForContentClass(link, links[link]);

    if (current_lang === 'fr') {
        newLang = 'en';
    } else if (current_lang === 'en') {
        newLang = 'fr';
    }

    $('.js_redirect_language').click(function () {
        document.location.href = document.location.origin + document.location.pathname + '?lang=' + newLang;
    });

    $('.js_redirect_logout').click(function () {
        document.location.href = document.location.origin + '/logout' + '?lang=' + current_lang;
    });
}

if (!onDataLoaded) {
    var onDataLoaded = function () {};
}

function bindOnClickEventForContentClass(redirect_class, path) {

    $(redirect_class).click(function () {
        location.href = path + '?lang=' + current_lang;
    });
}