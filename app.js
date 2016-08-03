const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const routers = require('./routers');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });


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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    console.log(err);
    res.status(err.status || 500);
    res.send('123123');
  });
}

app.listen(3000, '0.0.0.0', () => {
  console.dir('--------------------------');
  console.dir('app listening on port 3000', { colors: true });
  console.dir('--------------------------');
});
