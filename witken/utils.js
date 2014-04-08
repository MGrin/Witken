var ClientError = function (field, message) {
    this.content = 'Error';
    this._type = 'client';
    this.field = field;
    this.message = message;
}

var ServerError = function (message) {
    this.content = 'Error';
    this._type = 'server';
    this.message = message;
}

var DatabaseError = function (database, error) {
    this.content = 'Error';
    this._type = 'database';
    this.database = database;
    this.error = error;
}

exports.ClientError = ClientError;
exports.ServerError = ServerError;
exports.DatabaseError = DatabaseError;