var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items'); // kéo module items trong schemas để truy cập bảng items trong database
const utility = require('./../../helper/utility'); // kéo các hàm trong utility helper vào 
/* GET users listing. */
router.get('(/:id)?', function(req, res, next) {
    var data = { name: '', status: 'novalue' };
    if (req.params.id === '') {
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
    console.log(req.body);
    var data = { name: req.body.name, status: req.body.status };
    console.log(data);
    new ItemsModel(data).save((err, result) => {
        if (err) console.log(err);
        console.log(result);
    });
});
module.exports = router;