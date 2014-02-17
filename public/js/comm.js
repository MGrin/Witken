function setupOnClickEvents() {

    bindOnClickEventForContentClass('.js_redirect_index', '/', 'Index');
    bindOnClickEventForContentClass('.js_redirect_label', '/label', 'Label');
    bindOnClickEventForContentClass('.js_redirect_examen', '/examen', 'Examen');
    bindOnClickEventForContentClass('.js_redirect_witken', '/witken', 'Witken');
    bindOnClickEventForContentClass('.js_redirect_login', '/login', 'Witken - Inscription');
    bindOnClickEventForContentClass('.js_redirect_profile', '/profile', 'Witken - Profile');

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

function bindOnContentReceiveEvent(content, name, pathname) {
    $('#content').html(content);
    onContentChangeEnd();

    window.history.pushState(content, name, pathname);

    $(document).ready(function () {        
        setLocalTexts();
        onDataLoaded();
        setupCards();
    });
}

function bindOnClickEventForContentClass(redirect_class, path, history_name) {
    $(redirect_class).click(function () {
        var href = path + '?lang=' + current_lang;
        onContentChangeStart(function () {
            $.get(href, {
                ajax: true
            }, function (data) {
                bindOnContentReceiveEvent(data, history_name, href);
            }).fail(function(){
                console.log('Failed to connect to server');
            });
        });
    });
}