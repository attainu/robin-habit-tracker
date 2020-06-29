//Importing App Packages
import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import hbs from 'hbs';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
require('./middlewares/passport').default(passport);
import methodOverride from 'method-override';

//Importing Routes form Router
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import habitRoutes from './routes/habitRoutes';

//Setting environment Variables
var dotenv = require("dotenv")
dotenv.config()

//Establishing Express App
var app = express();

//mongoDb connection
mongoose.connect(process.env.MONGODB_URI.replace("<password>", process.env.MONGODB_PASSWORD, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }))
    .then(() => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });

// view engine setup
app.set('views', join(__dirname, 'views', "pages"));
app.set('view engine', 'hbs');
hbs.registerPartials(join(__dirname, "views", "partials"))

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
app.use(express.static(join(__dirname, 'public')));

//Routes as middlewares
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

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000.");
})

export default app;