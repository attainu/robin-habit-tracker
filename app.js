var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs')
var mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('./middlewares/passport')(passport);
const methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var habitRoutes = require('./routes/habitRoutes');

var app = express();

//mongoDb connection
mongoose
    .connect('mongodb://localhost/habitTracker', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views', "pages"));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, "views", "partials"))

//Global middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true,
}));
app.use(methodOverride('_method'))
// using flash for flash messages 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

//rendering static files
app.use(express.static(path.join(__dirname, 'public')));


app.use(indexRouter, usersRouter, habitRoutes);


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

//Do not remove this comment as the app does not run on 3000 in my system.

app.listen(8080, () => {
    console.log("Server running on port 8080.");
})

module.exports = app;