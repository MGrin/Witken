$(document).ready(function(){

    autoComplete("#prof_title", selectFirstItem('.js-select-sector'), '.js-select-sector');
    autoComplete(".prof_poste", selectFirstItem('.js-select-post'), '.js-select-post');
    autoComplete(".prof_hierarchy", selectFirstItem('.js-select-hierarchie_level'), '.js-select-hierarchie_level');
    autoComplete(".prof_experience", selectFirstItem('.js-select-experience_age'), '.js-select-experience_age');
    autoComplete(".prof_region", selectFirstItem('.js-select-region'), '.js-select-region');
    autoComplete(".prof_year_begin", selectFirstItem('.js-select-year'), '.js-select-year');
    autoComplete(".prof_year_end", selectFirstItem('.js-select-year'), '.js-select-year');


    function autoComplete(id, value, array){

        $(id).val(value);
        console.log($(id).val());
        $(id).autocomplete({
            source: selectArray(array),
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
    }
})