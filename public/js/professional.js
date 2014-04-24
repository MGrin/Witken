$(document).ready(function(){

    /*autoComplete("#prof_title", '.js-select-sector');
    autoComplete(".prof_poste", '.js-select-post');
    autoComplete(".prof_hierarchy", '.js-select-hierarchie_level');
    autoComplete(".prof_experience", '.js-select-experience_age');
    autoComplete(".prof_region", '.js-select-region');
    autoComplete(".prof_year_begin", '.js-select-year-array');
    autoComplete("#prof_year_end", '.js-select-region');

    function autoComplete(id, array){

        var value = (array == '.js-select-year-array') ? "1960" : selectFirstItem(array);
        $(id).val(value);
        $(id).autocomplete({
            source: (array == '.js-select-year-array') ? getSelectListFor(array) : selectArray(array),
            minLength:0,
            select: function (event, ui) {
                //temp = sessionStorage.setItem($(this).attr('name'), ui.item.value);
            },
            change: function(event, ui){
                if($(this).val() == ""){
                    $(this).val(value);
                }
            }
        }).focus(function(){
                $(this).val("");
                $(this).autocomplete("search");
            }).autocomplete("widget").addClass("fixed-height");
    }*/
})

function updateClickIcon(callback){
    $(".cancel_icon").click(function(){
        $(this).parent().parent().remove();
        callback();
    })
}