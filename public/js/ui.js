var defPadding = 10;

function initiate() {
    console.log('Initiation of UI');
    
    console.log('Setting up all .bottom-aligned');
    $('.bottom-aligned').each(function () {
        $(this).css('margin-top', $('.header').height() - $(this).height() - defPadding)
    });
    
    console.log('Setting up all .user-space-support');
    $('.user-space-support').each(function () {
        $(this).css('height', $(this).parent().height())
    });
    
    console.log('Setting up .footer');
    
    $('.footer').each(function(){
        $(this).css('height', 1.5 * $('.header').height());
        $(this).css('margin-top', $(document).height()-3.3*$(this).height());
    });
}