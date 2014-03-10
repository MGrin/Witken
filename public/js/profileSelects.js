var getSelectListFor = function(elem){
	var res = '';
	selects[elem].forEach(function(opt){
		res+='<option>'+opt+'</option>';
	});
	return res
}

var selects = {
	'.js-select-sector': ['lala', 'lele'],
	'.js-select-level':  ['lala', 'lele'],
	'.js-select-programm':  ['lala', 'lele'],
	'.js-select-language':  ['lala', 'lele'],
	'.js-select-post':  ['lala', 'lele'],
	'.js-select-diplome':  ['lala', 'lele'],
	'.js-select-material':  ['lala', 'lele'],
	'.js-select-region':  ['lala', 'lele'],
	'.js-select-enterprise':  ['lala', 'lele'],
	'.js-select-hierarchie_level':  ['lala', 'lele'],
	'.js-select-gettind_year': ['lala', 'lele'],
	'.js-select-end_time':  ['lala', 'lele'],
	'.js-select-start_time':  ['lala', 'lele'],
	'.js-select-experience_age': ['lala', 'lele']
};