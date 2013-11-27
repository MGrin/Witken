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

var ejs = require('ejs');
ejs.open = '§;';
ejs.close = ';§';

app.engine('.html', ejs.__express);
app.set('views', __dirname + '/views');

app.get('/', routes.index);

app.get('/label', routes.label.index);
app.get('/label/description', routes.label.description);
app.get('/label/reconnaissance', routes.label.reconnaissance);

app.get('/examen', routes.examen.index);
app.get('/examen/inscription', routes.examen.inscription);

app.get('/indexation', routes.indexation.index);
app.get('/indexation/comment', routes.indexation.comment);
app.get('/indexation/pour_qui', routes.indexation.pour_qui);

app.get('/witken', routes.witken.index);
app.get('/witken/nous', routes.witken.nous);
app.get('/witken/partenaires', routes.witken.partenaires);

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});