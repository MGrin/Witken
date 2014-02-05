var user = §§-JSON.stringify(user);§;

var onDataLoaded = function () {
    $('.js_redirect_logout').click(function () {
        document.location.href = document.location.origin + '/logout' + '?lang=' + current_lang;
    });

    if (onUserSideLoaded) {
        onUserSideLoaded();
    }
};