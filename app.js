var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('express-flash-notification');
const session = require('express-session');


var expressLayouts = require('express-ejs-layouts'); //module dung để tạo layout cho giao diện
// var mongoose = require('mongoose');
// define path
global.__base = __dirname + '/';
global.__pathConfigs = __base + 'configs/';
global.__pathRoutes = __base + 'routes/';
global.__pathSchemas = __base + 'schemas/';
global.__pathHelps = __base + 'helper/';
global.__pathValidation = __base + 'validation/';
const systemConfig = require( __pathConfigs + 'system');


// router
var indexRouter = require(__pathRoutes + 'index');

// mongoose.connect('mongodb://tuanlinh:164342816@115.79.35.159:27017/admin');
// const db = mongoose.connection;
// db.on('error', () => { console.log('connection error') }); // phải dùng function hoặc arrow function ở đây
// db.once('open', function() {
//     // we're connected! 
//     console.log('database connected');
// });
// const kittySchema = new mongoose.Schema({ // định nghĩa các trường dữ liệu cho collection
//     name: String
// });
// const Kitten = mongoose.model('Kitten', kittySchema); // tạo 1 collection tên là kitten có các trường như kittySchema
// const silence = new Kitten({ name: 'Silence' }); // tạo document có dự liệu name là Silence
// silence.save(function(err, silence) { // lưu dữ liệu
//     if (err) return console.error(err);
// })

// create a collection
// var nodejs = new ItemsModel({name: 'nodejs', status: '1', ordering: '1'});
// nodejs.save(function(err, nodejs){
//     if (err) return console.log(err);
// })


var app = express();
// notification
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(flash(app, { viewName: 'inc/admin/elements/flash' })); // có thể thay đổ tệp tin hiển thị flash mặc định thành tên khác và đường dẫn tới tệp tin đó

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
// app.set('layout', 'backend'); //set layout cho backend là file backend.ejs nội dung thay đổi sẽ được gọi vào được truyền tới <%- body %>
// cách set layout này sẽ set cho tất cả nên sử dụng cho phía client vì sẽ không cần gọi lại nhiều lần
// app.use(logger('dev')); // tắt log khi chạy
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// router
// local variable

app.locals.systemConfig = systemConfig; //tạo biến local để truyền tới view biến systemConfig sẽ có thể gọi được ở view ejs
global.__admin = systemConfig.prefixAdmin;
app.use(`/${systemConfig.prefixAdmin}`, require('./routes/backend/backendManager'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler (khi gọi url ko tồn tại trả về trang 404)
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error'); ///khi không tìm được trang sẽ trả về trang báo lỗi có thông báo lỗi đầy đủ
    // res.render('error', { title: 'errorPage' });
});

module.exports = app;