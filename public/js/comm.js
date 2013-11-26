function setupOnClickEvents() {
    $('#text_Label').click(function () {
        $.get('/label?lang=' + current_lang, {ajax: true}, function (data) {
            $('#content').html(data);
            window.history.pushState(data, "Label", "/label?lang="+current_lang);
        });
    });

    console.log('Setting up .text_Language_switch onClick event');
    $('#text_Language_switch').click(function () {
        document.location.href = document.location.origin + document.location.pathname + '?lang=' + newLang;
    });
}