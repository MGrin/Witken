var sources = ['Input', 'Database', 'Server', 'Route', 'Unknown'];
var levels = ['fatal', 'warning', 'info'];
var fields = ['email', 'pass', 'general'];
var databases = ['User', 'Eventbrite', 'Unknown'];
var routes = ['Order confirmation', 'Unknown'];

exports.generateInputError = function(field, message){
    if(fields.indexOf(field)===-1){
        field = 'general';
    }
    
    return {
        source: 'Input',        
        field: field,
        level: 'Warning',
        error_message: message
    };
}

exports.generateDatabaseError = function(database, message){
    if(databases.indexOf(database)===-1){
        database = 'Unknown';
    }
    
    return {
        source: 'Database',
        database: database,
        level: 'Fatal',
        error_message: message
    };
}

exports.generateServerError = function(level, message){
    if(levels.indexOf(level)===-1){
        level = 'warning';
    }
    
    return {
        source: 'Server',
        level: level,
        error_message: message
    };
}

exports.generateRoutingError = function(route, level, message){
    if(routes.indexOf(route)===-1){
        route = 'Unknown';
    }
    
    if(levels.indexOf(level)===-1){
        level = 'warning';
    }
    
    return {
        source: 'Route',
        route: route,
        level: level,
        error_message: message
    };
}