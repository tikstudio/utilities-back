const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const allowOrigin = require('./middleware/allowOrigin');
const authorization = require('./middleware/authorization');

const routes = require('./routes');

const app = express();

app.use(allowOrigin);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authorization);
Object.entries(routes).map(([key, val]) => {
  app.use('/' + key, val);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
