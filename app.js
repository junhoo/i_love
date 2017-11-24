const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//
//

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use('/', index);

app.use('/user', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.err = req.app.get('evn') == 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render();
})

module.exports = app;

// 监听到8000端口
// app.listen(8000, function () {
//     console.log('Hello World is listening at port 8000');
// });