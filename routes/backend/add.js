var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items'); // kéo module items trong schemas để truy cập bảng items trong database
const utility = require('./../../helper/utility'); // kéo các hàm trong utility helper vào 
/* GET users listing. */
router.get('(/:id)?', function(req, res, next) {
    if (req.params.id === '') {
        res.render('inc/admin/add', { title: 'add page' });
    } else {
        var data = {};
        ItemsModel.findById(req.params.id, (err, item) => {
            data = item;
            console.log(item);
        });
        console.log(data);
        res.render('inc/admin/add', { title: 'edit page', data });
    }
    // '/form(/:id)?'
    // console.log('abc');
    // req.flash('info', 'dinh ta tuan linh');
    // res.send('test flash');
    // res.end();

});
module.exports = router;