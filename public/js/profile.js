$(document).ready(function(){

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
});

function removeRow(button){
    document.getElementById('messages_table').deleteRow(button.closest("tr").index());
}

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