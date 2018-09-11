var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/home/index');
var usersRouter = require('./routes/users');
var posts=require('./routes/home/posts');
var admin=require('./routes/admin/admin');
var cats=require('./routes/admin/cats');
var article=require('./routes/admin/posts')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').__express) ;
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//ʹ���м�����뾲̬��Դ
app.use(express.static(path.join(__dirname,'views/admin')))

app.use('/', indexRouter);
app.use('/users', usersRouter);
//���ò�������ҳ���·��
app.use('/posts',posts);
//���ú�̨��ҳ���һ��·��
app.use('/admin/index',admin);
//���÷����б��һ��·��
app.use('/admin/cats',cats);
//���������б��һ��·��
app.use('/admin/posts',article)

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
