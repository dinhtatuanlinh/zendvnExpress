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
/* GET users listing. */

router.get('(/:id)?', function(req, res, next) {
    var data = { name: '', status: 'novalue' };
    var validatorErr = undefined;
    if (req.params.id === undefined) {
        res.render('inc/admin/add', { title: 'add page', data, validatorErr });
    } else {
        
        var data = {};
        ItemsModel.findById(req.params.id, (err, result) => {
            data = result;
            res.render('inc/admin/add', { title: 'edit page', data, validatorErr });
        });

    }
    // '/form(/:id)?'
    // console.log('abc');
    // req.flash('info', 'dinh ta tuan linh');
    // res.send('test flash');
    // res.end();

});
router.post('/save', itemsValidation.validator,  (req, respond, next) => {
    var data = { name: req.body.name, status: req.body.status };
    var validatorErr = validationResult(req).errors;// lấy ra lỗi khi validation
    if (req.body.id) {
        if(validatorErr.length > 0){
            res.render('inc/admin/add', { title: 'edit page', data, validatorErr });
        }else{
            ItemsModel.updateOne({_id: req.body.id}, data, (err, affected, res)=>{
                req.flash('success', 'cập nhật status thành công', false);
                respond.redirect(`/${req.app.locals.systemConfig.prefixAdmin}`);
                
            })
        }
    } else {
        // check validate
        // console.log(Object.assign(req.body));
        console.log(validatorErr);
        
        if(validatorErr.length > 0){
            console.log(data);
            res.render('inc/admin/add', { title: 'add page', data, validatorErr });
        }else{
            new ItemsModel(data).save().then(() => {
                req.flash('success', 'Thêm mới  thành công', false); // tham số thứ nhất là info là biến title truyền ra ngoài view, tham số thứ 2 là câu thông báo truyền ra ngoài view, nếu ko render ra giao diện thì phải thêm tham số thứ 3 là false
                respond.redirect(`/${req.app.locals.systemConfig.prefixAdmin}`);
            });
        }
        
    }
});
module.exports = router;