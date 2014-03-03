var sources = ['Input', 'Database', 'Server', 'Route', 'Unknown'];
var levels = ['fatal', 'warning', 'info'];
var fields = ['email', 'pass', 'general'];
var databases = ['User', 'Eventbrite', 'Label', 'Invitation', 'Unknown'];
var routes = ['Order confirmation', 'Unknown'];

/*
    {
        source: 
        level:
        id:
        error_message:
    }
*/

exports.generateInputError = function(field, message) {
    if (fields.indexOf(field) === -1) {
        field = 'general';
    }

    return {
        source: 'Input',
        field: field,
        id: fields.indexOf(field),
        level: 'Warning',
        error_message: message
    };
}

exports.generateDatabaseError = function(database, message) {
    if (databases.indexOf(database) === -1) {
        database = 'Unknown';
    }

    return {
        source: 'Database',
        database: database,
        id: (databases.indexOf(database) + 1) * 10,
        level: 'Fatal',
        error_message: message
    };
}

exports.generateServerError = function(level, message) {
    if (levels.indexOf(level) === -1) {
        level = 'warning';
    }

    return {
        source: 'Server',
        id: (levels.indexOf(level) + 1) * 20,
        level: level,
        error_message: message
    };
}

exports.generateRoutingError = function(route, level, message) {
    if (routes.indexOf(route) === -1) {
        route = 'Unknown';
    }

    if (levels.indexOf(level) === -1) {
        level = 'warning';
    }

    return {
        source: 'Route',
        id: (routes.indexOf(route) * levels.indexOf(level) + 1) * 30,
        route: route,
        level: level,
        error_message: message
    };
}

exports.generateNotImplementedYetError = function(source, function_name) {
    return {
        source: source,
        id: 500,
        level: 'fatal',
        error_message: ''
    }
}

exports.generateHackingError = function(source, message) {
    return {
        source: source,
        id: 666,
        level: 'fatal',
        error_message: message
    };
}

exports.generateConfirmationLink = function(eID, oID) {
    return 'http://intense-mesa-2057.herokuapp.com/order_confirm?eid=' + eID + '&oid=' + oID;
}