var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items'); // kéo module items trong schemas để truy cập bảng items trong database

/* GET users listing. */
router.get('/', (req, res, next) => {
    // get data from database
    // ItemsModel.find({}, function (err, items) { // thay bằng phương thức then để xử lý bất đồng bộ
    //     console.log(items);
    // });
    let statusFilter = [
        {name: 'all', count: null, link: '#', class: 'default'},
        {name: 'active', count: null, link: '#', class: 'success'},
        {name: 'inactive', count: null, link: '#', class: 'warning'},
    ];
    // đếm số document của collection
    statusFilter.forEach((item, index) => {
        let cond = {};
        if (item.name !== 'all') cond = {status: item.name};
        ItemsModel.count(cond).then((data)=>{
            statusFilter[index].count = data;
        })
    })
    
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