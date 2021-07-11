var express = require('express');
var router = express.Router();
const ItemsModel = require('./schemas/items'); // kéo module items trong schemas để truy cập bảng items trong database

/* GET users listing. */
router.get('/', (req, res, next) => {
    // get data from database
    ItemsModel.find({}, function (err, items) {
        console.log(items);
    });
    res.render('inc/admin/list', { title: 'abc list page' });
});
module.exports = router;