const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const debug = require('debug')('zxtool:db');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

// connect db
const mongoose = require('mongoose');
global.db = mongoose.connect('mongodb://localhost/zxtool');
db.connection.on('open', () => {
  debug('------数据库连接成功！------');
});
db.connection.on('error', error => {
  debug(`数据库连接失败：${error}`);
});

// routers
const routes = require('./routers/index');
const users = require('./routers/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// logger
app.use(morgan('dev', { stream: accessLogStream }));

// parse application/json
app.use(bodyParser.json());

// static directory
app.use(express.static(path.join(__dirname, 'public')));

// parse cookie
app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);

module.exports = app;
