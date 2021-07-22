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


const rolesModel = require(__pathSchemas + 'database').rolesModel; // kéo module items trong schemas để truy cập bảng items trong database
const utility = require(__pathHelps + 'utility'); // kéo các hàm trong utility helper vào 
const rolesValidation = require(__pathValidation + 'roles'); // keo ham validator

var col = 'roles';

var baselink = __admin + '/' + col;


/* GET roles listing. */
router.get('/', async (req, res, next) => {// khi truyền dữ liệu qua đường dẫn để lấy được dữ liệu đấy ta thêm /:status vào router. Nếu ko có dữ liệu truyền trên đường dẫn thì thêm (/:status)? nghĩa là có ý nghĩa là chuỗi được gửi lên có cũng được ko có cũng được
    // sort theo cột
    var sort = {};
    var sortField = (req.session.sortType == undefined) ? 'name' : req.session.sortField;
    var sortType = (req.session.sortType == undefined) ? 'asc' : req.session.sortType;
    sort[sortField] = sortType;// gắn dưới dạng array sẽ tự động chuyển qua object
    // console.log(sort);
    // change status
    // console.log(req.app.locals.systemConfig) // phương thức req.app.locals dùng để truy cập tới các biến locals được tạo như ở đây là biến locals systemConfig được tạo tại file app.js

    var number;
    await rolesModel.countDocuments({}, (err, data) => {
        if (err) return console.log(err); // cần phải có đoạn code này thì mới lấy được số lượng document
        // console.log(data);
        number = data;
    })
    // console.log(number);
    // search
    var search = "";
    if (req.query.search !== undefined) search = req.query.search; // req.query dùng để lấy dữ liệu search được gửi qua phương thức get
    var where = {};

    // pagination
    var pagiParams = await utility.pagiFunc(parseInt(req.query.p), number);
    // console.log(pagiParams);
    var addLink = "";
    if(search !== "") {
        addLink = "?search=" + search;
        where.name = new RegExp(search, 'i'); // RegExp là regular expressions giúp tìm document chứa đoạn kí tự search, i là ko phân biệt hoa thường
    }
    // check roles existence
    var rolesExistence = async (roles) =>{

        for(var role of roles){

            await rolesModel.find({'role': role}).then((items)=>{
                if(items.length === 0){
                    console.log('chua tồn tại');
                    new usersModel({'role': role}).save().then(() => {
                        console.log(`role ${role} vừa được tạo`);
                    });
                }
            });
        }
        
    }
    rolesExistence([
        'admin',
        'mod',
        'editor',
        'shop manager',
        'client'
    ]);
    rolesModel.find(where)
    .sort(sort)
    .skip(pagiParams.position)
    .limit(pagiParams.itemsPerPage)
    .then(( items) => { // thay bằng phương thức then để xử lý bất đồng bộ
        res.render(`inc/admin/${col}/list`, { 
            title: 'abc list page',
            items,
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

router.get('/sort/:field/:type', (req, res, next) => {
    req.session.sortField = req.params.field;// req.session giúp đưa dữ liệu vào session để gọi ra ở router khác
    req.session.sortType = req.params.type;
    res.redirect(`/${req.app.locals.systemConfig.prefixAdmin}/${col}`);
})
module.exports = router;