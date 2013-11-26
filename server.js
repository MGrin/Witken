var express = require('express');
var app = express();

var routes = require('./routes.js');

app.configure(function () {
    app.use(express.favicon()); // отдаем стандартную фавиконку, можем здесь же свою задать
    app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
    app.use(express.static('public'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'secret epfl session'
    }));
    app.use(express.bodyParser());
//    app.use(passport.initialize());
//    app.use(passport.session());
    app.use(app.router);
});

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');

app.get('/', routes.index);
app.get('/label', routes.label.index);
app.get('/label/description', routes.label.description);
app.get('/label/reconnaissance', routes.label.reconnaissance);

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});