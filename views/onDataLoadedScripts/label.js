var currentLabeldescription;

var onDataLoaded = function () {
    if (!currentLabeldescription) {
        currentLabeldescription = $('#gold_label_small');
    }
    $('#label_silver_text').removeClass('hide');
    $('#label_bronze_text').removeClass('hide');

    $('#label_silver_text').hide();
    $('#label_bronze_text').hide();
    $('.js_label').each(function () {
        $(this).mouseenter(function () {
            showLabelDescription($(this));
        });
    });
    showLabelDescription(currentLabeldescription);

};

var showLabelDescription = function (label) {
    $('.js_label').each(function () {
        $(this).removeClass('card_black_border');
    });
    label.addClass('card_black_border');
    $('#label_area').removeClass('gold_bg');
    $('#label_area').removeClass('silver_bg');
    $('#label_area').removeClass('bronze_bg');

    $('#label_or_text').hide();
    $('#label_silver_text').hide();
    $('#label_bronze_text').hide();

    currentLabeldescription = label;
    switch (label.attr('id')) {
    case "gold_label_small":
        $('#label_area').addClass('gold_bg');
        $('#label_or_text').show();
        break;
    case "silver_label_small":
        $('#label_area').addClass('silver_bg');
        $('#label_silver_text').show();
        break;
    case "bronze_label_small":
        $('#label_area').addClass('bronze_bg');
        $('#label_bronze_text').show();
        break;
    }
}