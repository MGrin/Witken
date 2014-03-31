$(document).ready(function(){
    var demo1 = $("#carousel").slippry({
        transition: 'horizontal',
        useCSS: true,
        speed: 1000,
        pause: 5000,
        auto: true,
        preload: 'visible'
    });

    $('.stop').click(function () {
        demo1.stopAuto();
    });

    $('.start').click(function () {
        demo1.startAuto();
    });

    $('.prev').click(function () {
        demo1.goToPrevSlide();
        return false;
    });
    $('.next').click(function () {
        demo1.goToNextSlide();
        return false;
    });
    $('.reset').click(function () {
        demo1.destroySlider();
        return false;
    });
    $('.reload').click(function () {
        demo1.reloadSlider();
        return false;
    });
    $('.init').click(function () {
        demo1 = $("#carousel").slippry();
        return false;
    });

    $('.discover').click(function () {
        location.href = '/label' + '?lang=' + current_lang;
    });
})