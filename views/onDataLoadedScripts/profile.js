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
    $('.profile-content').height($('#profile-menu').height()-20);
    getExamenStatus();
    bindOnClickEventForMenuItems();
    setupDownloadsLinks();
};

function setupDownloadsLinks() {
    $('.profile-download-buttons-wrapper').each(function () {
        $(this).css('bottom', 0);
    });
    $('.profile-download-file').each(function () {
        $(this).html('<span>' + getTextForId($(this).attr('text')) + '</span><br/><img class="profile-download-img" src="/img/tools/WK-arrow-rouge.png" width=45 style="margin-top: 50px;"/>');
    });
}

var bindOnClickEventForMenuItems = function () {
    var addActiveClass = function (element) {
        element.addClass('active');
        element.addClass('silver_very_dark_bg');
    }

    var removeActiveClass = function (element) {
        element.removeClass('active');
        element.removeClass('silver_very_dark_bg');
    }

    $('.profile-menu-item').each(function () {
        $(this).click(function () {
            $('.profile-menu-item').each(function () {
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
            case 'general_label_and_certificats':
                showProfilePage($('#profile-label_and_certificats'));
                break;
            case 'general_indexation':
                showProfilePage($('#profile-indexation'));
                break;
            case 'general_messages':
                showProfilePage($('#profile-messages'));
                break;
            case 'general_compte':
                showProfilePage($('#profile-compte'));
                break;
            default:
                return;
            }
        });
    });
}
var showProfilePage = function (page) {
    $('.profile-content').each(function () {
        $(this).hide();
    });
    page.show();
    setupDownloadsLinks();
}

var getExamenStatus = function () {
    var params = {
        exam_id: §§= user.examen.eb_id;§
    };
    $.get('/api/exam_sts', params, function (data) {
        $('#exam_status').html('<span class="font-HelveticaNeueThin">Status : </span>' + (data.status ? 'Confirme' : 'Pas confirme'));
    });
}