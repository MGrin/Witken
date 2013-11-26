exports.index = function(req, res){
    var par = {};
    if(!req.param('lang')){
        par.lang='fr';
    }else{
        par.lang=req.param('lang');
    }
    res.render('index.html', par);
}

exports.label = {};

exports.label.index = function(req, res){
    var par = {};
    if(!req.param('lang')){
        par.lang='fr';
    }else{
        par.lang=req.param('lang');
    }
    
    if(!req.param('ajax')){
        res.render('label_index_full.html', par);
    }else{
        res.render('label_index.html', par);
    }    
}

exports.label.description = function(req, res){
    
}

exports.label.reconnaissance = function(req, res){
    
}