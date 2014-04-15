var ClientError = function (field, message) {
    if(!message.content){
        this.content = 'Error';
        this._type = 'client';
        this.field = field;
        this.message = message;
    }else{
        this = message;
    }
    console.log('Client error in '+field+' field: '+JSON.stringify(message));
}

var ServerError = function (message) {
    if(!message.content){
        this.content = 'Error';
        this._type = 'server';
        this.message = message;
    }else{
        this = message;
    }
    console.log('Server error: '+JSON.stringify(message));
}

var DatabaseError = function (database, error) {
    if(!error.content){
        this.content = 'Error';
        this._type = 'database';
        this.database = database;
        this.error = error;
    }else{
        this = error;
    }
    console.log('Database error in '+database+': '+JSON.stringify(error));
}

exports.ClientError = ClientError;
exports.ServerError = ServerError;
exports.DatabaseError = DatabaseError;