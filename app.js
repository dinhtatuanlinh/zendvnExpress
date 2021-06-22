var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var expressLayouts = require('express-ejs-layouts'); //module dung để tạo layout cho giao diện
var mongoose = require('mongoose');

const systemConfig = require('./configs/system');
const ItemsModel = require('./schemas/itemss'); // kéo module items trong schemas để sử dụng



mongoose.connect('mongodb://dinhtatuanlinh:0123698745@35.185.189.38/admin');
const db = mongoose.connection;
db.on('error', () => { console.log('connection error') }); // phải dùng function hoặc arrow function ở đây
db.once('open', function() {
    // we're connected! 
    console.log('connected');
});
const kittySchema = new mongoose.Schema({ // định nghĩa các trường dữ liệu cho collection
    name: String
});
const Kitten = mongoose.model('Kitten', kittySchema); // tạo 1 collection tên là kitten có các trường như kittySchema
const silence = new Kitten({ name: 'Silence' }); // tạo document có dự liệu name là Silence
silence.save(function(err, silence) { // lưu dữ liệu
    if (err) return console.error(err);
})







var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'backend'); //set layout cho backend là file backend.ejs

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// local variable
app.locals.systemConfig = systemConfig; //tạo biến local để truyền tới view

app.use(`/${systemConfig.prefixAdmin}`, require('./routes/backend/backendManager'));

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
    // res.render('error');///khi không tìm được trang sẽ trả về trang báo lỗi
    res.render('error', { title: 'errorPage' });
});

module.exports = app;