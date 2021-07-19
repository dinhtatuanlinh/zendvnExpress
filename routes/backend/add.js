var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const ItemsModel = require('./../../schemas/items'); // kéo module items trong schemas để truy cập bảng items trong database
const utility = require('./../../helper/utility'); // kéo các hàm trong utility helper vào 
const itemsValidation = require('./../../validation/items'); // keo ham validator
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
router.post('/save', itemsValidation.validator,  (req, res, next) => {
    var data = { name: req.body.name, status: req.body.status };
    if (req.body.id) {

    } else {
        // check validate
        // console.log(Object.assign(req.body));
        var validatorErr = validationResult(req);
        
        if(validatorErr !== false){
            validatorErr = validatorErr.errors;
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