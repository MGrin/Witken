var user = §§-JSON.stringify(user);§;

var onDataLoaded = function () {
    $('.js_redirect_logout').click(function () {
        document.location.href = document.location.origin + '/logout' + '?lang=' + current_lang;
    });

    if ($(window).width() >= normal_screen) {
        $('#profile-menu').css('left', 10);
        $('.profile').css('left', 10);
    } else {
        $('#profile-menu').css('left', 0);
        $('.profile').css('left', 0);
    }

    $('.profile-content').each(function () {
        $(this).removeClass('hide');
        $(this).hide();
    });

    $('#profile-examen').show();

    var addActiveClass = function(element){
        element.addClass('active');
        element.addClass('silver_very_dark_bg');
    }
    
    var removeActiveClass = function(element){
        element.removeClass('active');
        element.removeClass('silver_very_dark_bg');
    }
    
    $('.profile-menu-item').each(function () {
        $(this).click(function () {
            $('.profile-menu-item').each(function(){
                removeActiveClass($(this));
            });
            addActiveClass($(this));
            
            switch ($(this).children().attr('text')) {
            case 'general_examen':
                showProfilePage($('#profile-examen'));
                break;
            case 'general_results':
                showProfilePage($('#profile-resultat'));
                break;
            default:
                return;
            }
        });
    });
    $('.profile').height($('#profile-menu').height());
};

var showProfilePage = function (page) {
    $('.profile-content').each(function () {
        $(this).hide();
    });
    page.show();
}