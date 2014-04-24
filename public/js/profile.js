$(document).ready(function(){

    setCirclesGreen(2);

    $("#profile-menu").css({
        "width" : $(".user-content").width() + 10
    });

    $(".profile").css({
        "width" : $(".profile-wrapper").width() - $("#profile-menu").width(),
        "height" : $("#profile-menu").height()
    });

    $(".confirm_block").width($(".profile_status").width() + $(".profile_confirm").width() + 5);
    $(".indexation_block_right").width($(".inner-wrapper").width() - $(".indexation_block_left").width() - parseInt($(".indexation_block_right").css("marginBottom")) * 2 - 6);

    $(".profile_refuse_button").click(function(){
        removeRow($(this));
    });

    $(".profile_accept_button").click(function(){
        addRow("Entreprise SA - Finance", "501-1000 employees", "Lausanne VD");
    });

    $(".messages_table_block").bind({
        mouseenter: disableScroll,
        mouseleave: enableScroll
    })

    // Toggle overlayBox
    $(".profile_parrainez_data").bind(

        "click", doOverlayOpen
    )

    $(".closeOverlay").click(doOverlayClose);
    $(".profile_accept_button_p").click(onParrainez);
    $(".profile_refuse_button_p").click(doOverlayClose);

    var isOpen = false;

    //Open parrainez window
    function showOverlayBox() {

        //if box is not set to open then don't do anything
        if( isOpen == false ) return;
        // set the properties of the overlay box, the left and top positions

        $('.overlayBox').css({
            display:'block',
            left:( $(window).width() - $('.overlayBox').width() ) / 2,
            top:( screen.availHeight - $('.overlayBox').height() ) / 2 - 20,
            position: 'absolute'
        });

        // set the window background for the overlay. i.e the body becomes darker
        $('.bgCover').css({
            display:'block',
            width: $(window).width(),
            height:$(window).height()
        });
    }

    function doOverlayOpen() {
        //set status to open
        isOpen = true;
        disableScroll();
        showOverlayBox();
        $('.bgCover').css({opacity:0}).animate( {opacity:0.5, backgroundColor:'#000'} );
        $('.overlayBox').css({opacity:0}).animate({opacity:1.0});
        // don't follow the link : so return false.
        return false;
    }

    function doOverlayClose() {
        //set status to closed
        isOpen = false;
        enableScroll();
        $('.overlayBox').css( 'display', 'none' );
        // now animate the background to fade out to opacity 0
        // and then hide it after the animation is complete.
        $('.bgCover').animate( {opacity:0}, null, null, function() { $(this).hide(); } );
        $('.parrainez_email').val('');
        $('.parrainez_email').css("border", "none");
    }

    function onParrainez(){

        var email = $("#invite_email").find('input[name="email"]').val();
        if(email != '' && testEmail(email)){
            $.ajax({
                url: '/invite',
                type: "post",
                data: {
                    user_inviter: email,
                    invited: email
                } ,
                success: function(data) {
                    //TO DO

                }
            });
            doOverlayClose();
        }else{
            $('.parrainez_email').css("border", "1px solid #FF0000");
        }
    }

    $('.parrainez_email').change(function(){

        if($(this) == ''){
            $(this).css("border", "1px solid #FF0000");
        }else if(!testEmail($(this).val())){
            $(".profile_parrainez_enter").html(appendElement("profile_parrainez_enter",getTextForId("signup_error_email_format")));
            $(this).css("border", "1px solid #FF0000");
        }else{
            $(this).css("border", "none");
            $(".profile_parrainez_enter").html(getTextForId("profile_parrainez_enter"));
        }
    })
});

//Remove row based on button row location
function removeRow(button){
    document.getElementById('messages_table').deleteRow(button.closest("tr").index());
}

//Add a row to the bottom of the table. EnterpriseName, EmployeesNumber, EnterpriseLocation
function addRow(name, employee, location){

    var row = document.getElementById('messages_table').insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "<p class=\"enterprise_name\">" + name + "</p><p class=\"enterprise_details\">" + employee + "</p><p class=\"enterprise_location\">" + location + "</p>";
    cell2.innerHTML = "<button type=\"button\" class=\"multilang profile_accept_button black_gradient_top\">" + getTextForId("profile_accept") + "</button><button type=\"button\" class=\"multilang profile_refuse_button gray_gradient_top\">" + getTextForId("profile_refuse") + "</button>";

    $(".profile_refuse_button").click(function(){
        removeRow($(this));
    });
    $(".profile_accept_button").click(function(){
        addRow("Entreprise SA - Finance", "501-1000 employees", "Lausanne VD");
    });
}

//Set the number of green circles on page load for number of friends added
function setCirclesGreen(number){
    var arrayCircles = document.getElementById("overlayRewards").getElementsByTagName("span");

    for(var i = 1; i <= number; i++){
        arrayCircles[i - 1].className = "green_bg";
    }
}