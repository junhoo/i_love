const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/http_error_handler');
require('./services/mongodb_connection');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favcion(path.join(__dirname, 'public', 'favcion.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/user', users);

app.use(errorHandler());

process.on('uncaughtException', (err) => {

});

process.on('unhandledReject', (reason, p) => {

});

module.exports = app;