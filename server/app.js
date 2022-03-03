var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const boddyParser = require('body-parser');
// const mporgan = require('morgan');
const mongoose = require('mongoose');
var usersRouter = require('./routes/users');
var subjectRouter = require('./routes/subject');
var gradeRouter = require('./routes/grade');
var examRouter = require('./routes/exams')
require('dotenv').config()
var app = express();
var cors = require('cors')
console.log(process.env.NODE_ENV)
// connect to Mongodb 
mongoose.connect('mongodb://mitul:mitul1@cluster0-shard-00-00.ly7cv.mongodb.net:27017,cluster0-shard-00-01.ly7cv.mongodb.net:27017,cluster0-shard-00-02.ly7cv.mongodb.net:27017/roosevelt?ssl=true&replicaSet=atlas-12z2uv-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  //mongoose.connect('mongodb://root:root@127.0.0.1:27017/happymeter-dev1?authSource=admin', { useMongoClient: true })
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database knowledgebase`);
  })
  .catch((erro) => {
    console.log(`Error Connecting to the Mongodb Database at URL knowledgebase`, erro);
  });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/subject', subjectRouter)
app.use('/grades', gradeRouter)
app.use('/exams', examRouter)
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
  res.render('error');
});

module.exports = app;
