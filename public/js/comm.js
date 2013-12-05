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

    $('[text=text_Label]').click(function () {
        var href = '/label?lang=' + current_lang
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Label', href);
        });
    });

    $('[text=text_description').click(function () {
        var href = '/label/description?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Label Description', href);
        });
    });

    $('[text=text_reconnaissance').click(function () {
        var href = '/label/reconnaissance?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Label Reconnaissance', href);
        });
    });

    $('[text=text_Examen').click(function () {
        var href = '/examen?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Examen', href);
        });
    });

    $('[text=text_inscription_etc').click(function () {
        var href = '/examen/inscription?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Examen Inscription', href);
        });
    });

    $('[text=text_Indexation').click(function () {
        var href = '/indexation?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Indexation', href);
        });
    });


    $('[text=text_comment').click(function () {
        var href = '/indexation/comment?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Indexation - comment?', href);
        });
    });

    $('[text=text_pour_qui').click(function () {
        var href = '/indexation/pour_qui?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Indexation - pour qui?', href);
        });
    });

    $('[text=text_Witken').click(function () {
        var href = '/witken?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Witken', href);
        });
    });

    $('[text=text_nous').click(function () {
        var href = '/witken/nous?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Witken - nous', href);
        });
    });

    $('[text=text_nos_partenaires').click(function () {
        var href = '/witken/partenaires?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Witken - partenaires', href);
        });
    });

    $('[text=text_Login').click(function () {
        var href = '/auth?lang=' + current_lang;
        $.get(href, {
            ajax: true
        }, function (data) {
            bindOnContentReceiveEvent(data, 'Witken - Login', href);
        });
    });
    $('[text=text_logout]').click(function () {
        document.location.href = document.location.origin + '/logout' + '?lang=' + current_lang;
    });

    if (current_lang === 'fr') {
        newLang = 'en';
    } else if (current_lang === 'en') {
        newLang = 'fr';
    }

    console.log('Setting up .text_Language_switch onClick event');
    $('[text=text_Language_switch').click(function () {
        document.location.href = document.location.origin + document.location.pathname + '?lang=' + newLang;
    });
}

if (!onDataLoaded) {
    var onDataLoaded = function () {};
}

function bindOnContentReceiveEvent(content, name, pathname) {
    $('#content').html(content);
    window.history.pushState(content, name, pathname);
    setupFooter();
    setLocalTexts();
    onDataLoaded();

    if ($(window).width() < 970) {
        $(window).scrollTop($('#content').position().top)
    }
}