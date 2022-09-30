var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var home = require('./routes/home');
var courses = require('./routes/courses');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo');
var passportConfig = require('./auth/passport-config');
var config = require('./config');
var restrict = require('./auth/restrict');

passportConfig();
var app = express();
mongoose.connect(config.mongoUri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let store = new MongoStore({
  mongoUrl: config.mongoUri,
  collection: "sessions"
});


app.use(expressSession({
  secret:'private-key',
  saveUninitialized: false,
  resave:false,
  store: store
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(restrict);
app.use('/home', home);
app.use('/courses', courses);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
