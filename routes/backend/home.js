var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items'); // kéo module items trong schemas để truy cập bảng items trong database
const utility = require('./../../helper/utility'); // kéo các hàm trong utility helper vào 

/* GET users listing. */
router.get('/', (req, res, next) => {
    // get data from database
    // ItemsModel.find({}, function (err, items) { // thay bằng phương thức then để xử lý bất đồng bộ
    //     console.log(items);
    // });
    let statusFilter = utility.statusFilter;
    
    ItemsModel.find({}).then(( items) => { // thay bằng phương thức then để xử lý bất đồng bộ
            console.log(items);
            res.render('inc/admin/list', { 
                title: 'abc list page',
                items: items,
                statusFilter: statusFilter
            });
        });
    
});
module.exports = router;