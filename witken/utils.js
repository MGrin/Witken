var ClientError = function (field, message) {
    this.content = 'Error';
    this._type = 'client';
    this.field = field;
    this.message = message;

    console.log('Client error in '+field+' field: '+message);
}

var ServerError = function (message) {
    this.content = 'Error';
    this._type = 'server';
    this.message = message;

    console.log('Server error: '+message);
}

var DatabaseError = function (database, error) {
    this.content = 'Error';
    this._type = 'database';
    this.database = database;
    this.error = error;
    console.log('Database error in '+database+': '+error);
}

exports.ClientError = ClientError;
exports.ServerError = ServerError;
exports.DatabaseError = DatabaseError;