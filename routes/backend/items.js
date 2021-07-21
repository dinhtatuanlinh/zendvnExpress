var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var util = require('util');
//util.format('dinh ta tuan linh %d', 3);// thư viện util của nodejs giúp đưa biến vào trong một chuỗi
// format <string> A printf-like format string.
// The util.format() method returns a formatted string using the first argument as a printf-like format string which can contain zero or more format specifiers. Each specifier is replaced with the converted value from the corresponding argument. Supported specifiers are:
//     %s: String will be used to convert all values except BigInt, Object and -0. BigInt values will be represented with an n and Objects that have no user defined toString function are inspected using util.inspect() with options { depth: 0, colors: false, compact: 3 }.
//     %d: Number will be used to convert all values except BigInt and Symbol.
//     %i: parseInt(value, 10) is used for all values except BigInt and Symbol.
//     %f: parseFloat(value) is used for all values expect Symbol.
//     %j: JSON. Replaced with the string '[Circular]' if the argument contains circular references.
//     %o: Object. A string representation of an object with generic JavaScript object formatting. Similar to util.inspect() with options { showHidden: true, showProxy: true }. This will show the full object including non-enumerable properties and proxies.
//     %O: Object. A string representation of an object with generic JavaScript object formatting. Similar to util.inspect() without options. This will show the full object not including non-enumerable properties and proxies.
//     %c: CSS. This specifier is ignored and will skip any CSS passed in.
//     %%: single percent sign ('%'). This does not consume an argument.
//     Returns: <string> The formatted string
// If a specifier does not have a corresponding argument, it is not replaced:
// util.format('%s:%s', 'foo');
// // Returns: 'foo:%s'


const ItemsModel = require(__pathSchemas + 'items'); // kéo module items trong schemas để truy cập bảng items trong database
const utility = require(__pathHelps + 'utility'); // kéo các hàm trong utility helper vào 
const itemsValidation = require(__pathValidation + 'items'); // keo ham validator

var col = 'items';

var baselink = __admin + '/' + col;


/* GET users listing. */
router.get('(/status/:status)?', async (req, res, next) => {// khi truyền dữ liệu qua đường dẫn để lấy được dữ liệu đấy ta thêm /:status vào router. Nếu ko có dữ liệu truyền trên đường dẫn thì thêm (/:status)? nghĩa là có ý nghĩa là chuỗi được gửi lên có cũng được ko có cũng được
    
    let statusFilter = [
        {name: 'all', num: null, link: '#', class: 'default'},
        {name: 'active', num: null, link: '#', class: 'default'},
        {name: 'inactive', num: null, link: '#', class: 'default'},
    ];
    // sort theo cột
    var sort = {};
    var sortField = (req.session.sortType == undefined) ? 'name' : req.session.sortField;
    var sortType = (req.session.sortType == undefined) ? 'asc' : req.session.sortType;
    sort[sortField] = sortType;// gắn dưới dạng array sẽ tự động chuyển qua object
    // console.log(sort);
    // change status
    // console.log(req.app.locals.systemConfig) // phương thức req.app.locals dùng để truy cập tới các biến locals được tạo như ở đây là biến locals systemConfig được tạo tại file app.js
    if(req.query.changestatus !== undefined && req.query.changestatus === "1"){
        if (req.query.status === "active"){
            ItemsModel.updateOne({_id: req.query.id}, {status: "inactive"}, (err, affected, res)=>{
                console.log("success");
            })
        }else{
            ItemsModel.updateOne({_id: req.query.id}, {status: "active"}, (err, affected, res)=>{
                console.log("success");
            })
        }
    }
    // search
    var search = "";
    if (req.query.search !== undefined) search = req.query.search; // req.query dùng để lấy dữ liệu search được gửi qua phương thức get
    var where = {};
    // để lấy được dữ liệu trên đường dẫn ta sử dụng req.params.status với status là dữ liệu (/:status)? (console.log(req.params.status))
    var statusCurrent = req.params.status;
    // console.log(statusCurrent);
    if(statusCurrent == undefined) statusCurrent = 'all';
    statusFilter = await utility.statusButton(statusCurrent, statusFilter);// utility trả về async là 1 promise nên cũng phải await ra
    console.log(statusFilter);
    // pagination
    var pagiParams = await utility.pagiFunc(parseInt(req.query.p), statusFilter[0].num);
    console.log(pagiParams);
    if(statusCurrent !== 'all') where.status = statusCurrent;// xử lý khi currentstatus bằng all
    // console.log(statusCurrent);
    var addLink = "";
    if(search !== "") {
        addLink = "?search=" + search;
        where.name = new RegExp(search, 'i'); // RegExp là regular expressions giúp tìm document chứa đoạn kí tự search, i là ko phân biệt hoa thường
    }
    
    ItemsModel.find(where)
    .sort(sort)
    .skip(pagiParams.position)
    .limit(pagiParams.itemsPerPage)
    .then(( items) => { // thay bằng phương thức then để xử lý bất đồng bộ
        res.render(`inc/admin/items/list`, { 
            title: 'abc list page',
            items,
            statusFilter,
            statusCurrent,
            search,
            addLink,
            pagiParams,
            sortField,
            sortType,
            col,
            baselink
        });
    });
});
router.post('/changestatus/:status', (req, res, next) => {// lấy dữ liệu gửi lên qua phương thức post
    // console.log(req.params.status);// lấy status truyền trên url
    // console.log(req.body);// phương thức req.body của module body parser dùng để lấy dữ liệu gửi lên tư form post
    ItemsModel.updateMany({_id: {$in: req.body.cid}}, {status: req.params.status}, (err, affected, result)=>{//
        console.log(result);
        console.log(affected);
        req.flash('success', 'cập nhật status thành công', false);// tham số thứ nhất là info là biến title truyền ra ngoài view, tham số thứ 2 là câu thông báo truyền ra ngoài view, nếu ko render ra giao diện thì phải thêm tham số thứ 3 là false
        res.redirect(`/${req.app.locals.systemConfig.prefixAdmin}/${col}`);
    });
});
router.get('/sort/:field/:type', (req, res, next) => {
    req.session.sortField = req.params.field;// req.session giúp đưa dữ liệu vào session để gọi ra ở router khác
    req.session.sortType = req.params.type;
    res.redirect(`/${req.app.locals.systemConfig.prefixAdmin}/${col}`);
})
router.get('/add(/:id)?', function(req, res, next) {
    var data = { name: '', status: 'novalue' };
    var validatorErr = undefined;
    if (req.params.id === undefined) {
        res.render('inc/admin/add', { title: 'add page', data, validatorErr });
    } else {
        
        var data = {};
        ItemsModel.findById(req.params.id, (err, result) => {
            data = result;
            res.render('inc/admin/add', { title: 'edit page', data, validatorErr, baselink });
        });

    }
    // '/form(/:id)?'
    // console.log('abc');
    // req.flash('info', 'dinh ta tuan linh');
    // res.send('test flash');
    // res.end();

});
router.post('/add/save', itemsValidation.validator,  (req, res, next) => {
    var data = { name: req.body.name, status: req.body.status, content: req.body.content };
    console.log(data);
    var validatorErr = validationResult(req).errors;// lấy ra lỗi khi validation
    if (req.body.id) {
        if(validatorErr.length > 0){
            res.render('inc/admin/add', { title: 'edit page', data, validatorErr });
        }else{
            ItemsModel.updateOne({_id: req.body.id}, data, (err, affected, result)=>{
                req.flash('success', 'cập nhật status thành công', false);
                res.redirect(`/${req.app.locals.systemConfig.prefixAdmin}`);
                
            })
        }
    } else {
        // check validate
        // console.log(Object.assign(req.body));
        // console.log(validatorErr);
        
        if(validatorErr.length > 0){
            // console.log(data);
            res.render('inc/admin/add', { title: 'add page', data, validatorErr });
        }else{
            new ItemsModel(data).save().then(() => {
                req.flash('success', 'Thêm mới  thành công', false); // tham số thứ nhất là info là biến title truyền ra ngoài view, tham số thứ 2 là câu thông báo truyền ra ngoài view, nếu ko render ra giao diện thì phải thêm tham số thứ 3 là false
                res.redirect(`/${req.app.locals.systemConfig.prefixAdmin}`);
            });
        }
        
    }
});
module.exports = router;