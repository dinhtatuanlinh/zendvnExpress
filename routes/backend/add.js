var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items'); // kéo module items trong schemas để truy cập bảng items trong database
const utility = require('./../../helper/utility'); // kéo các hàm trong utility helper vào 
/* GET users listing. */
router.get('(/:id)?', function(req, res, next) {
    var data = { name: '', status: 'novalue' };
    console.log(req.params.id);
    if (req.params.id === undefined) {
        console.log('abc');
        res.render('inc/admin/add', { title: 'add page', data });
    } else {
        var data = {};
        ItemsModel.findById(req.params.id, (err, result) => {
            data = result;
            res.render('inc/admin/add', { title: 'edit page', data });
        });

    }
    // '/form(/:id)?'
    // console.log('abc');
    // req.flash('info', 'dinh ta tuan linh');
    // res.send('test flash');
    // res.end();

});
router.post('/save', (req, res, next) => {
    var data = { name: req.body.name, status: req.body.status };
    new ItemsModel(data).save().then(() => {
        req.flash('success', 'Thêm mới  thành công', false); // tham số thứ nhất là info là biến title truyền ra ngoài view, tham số thứ 2 là câu thông báo truyền ra ngoài view, nếu ko render ra giao diện thì phải thêm tham số thứ 3 là false
        res.redirect(`/${req.app.locals.systemConfig.prefixAdmin}`);
    });
});
module.exports = router;