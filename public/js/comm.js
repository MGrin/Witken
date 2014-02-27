function setupOnClickEvents() {

    bindOnClickEventForContentClass('.js_redirect_index', '/');
    bindOnClickEventForContentClass('.js_redirect_label', '/label');
    bindOnClickEventForContentClass('.js_redirect_examen', '/examen');
    bindOnClickEventForContentClass('.js_redirect_witken', '/witken');
    bindOnClickEventForContentClass('.js_redirect_login', '/login');
    bindOnClickEventForContentClass('.js_redirect_profile', '/profile');

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
        location.href = path+'?lang='+current_lang;
    });
}