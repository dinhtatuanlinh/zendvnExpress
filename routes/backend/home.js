var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items'); // kéo module items trong schemas để truy cập bảng items trong database
const utility = require('./../../helper/utility'); // kéo các hàm trong utility helper vào 

/* GET users listing. */
router.get('(/:status)?', async (req, res, next) => {// khi truyền dữ liệu qua đường dẫn để lấy được dữ liệu đấy ta thêm /:status vào router. Nếu ko có dữ liệu truyền trên đường dẫn thì thêm (/:status)? nghĩa là có ý nghĩa là chuỗi được gửi lên có cũng được ko có cũng được
    let statusFilter = [
        {name: 'all', num: null, link: '#', class: 'default'},
        {name: 'active', num: null, link: '#', class: 'default'},
        {name: 'inactive', num: null, link: '#', class: 'default'},
    ];
    // get data from database
    // ItemsModel.find({}, function (err, items) { // thay bằng phương thức then để xử lý bất đồng bộ
    //     console.log(items);
    // });
    var where = {};
    // để lấy được dữ liệu trên đường dẫn ta sử dụng req.params.status với status là dữ liệu (/:status)? (console.log(req.params.status))
    var statusCurrent = req.params.status;
    if(statusCurrent == undefined) statusCurrent = 'all';
    statusFilter = await utility.statusButton(statusCurrent, statusFilter);// utility trả về async là 1 promise nên cũng phải await ra
    // console.log(statusFilter);
    if(statusCurrent !== 'all') where = {status: statusCurrent};
    // console.log(where);
    ItemsModel.find(where).then(( items) => { // thay bằng phương thức then để xử lý bất đồng bộ
            // console.log(items);
            res.render('inc/admin/list', { 
                title: 'abc list page',
                items: items,
                statusFilter: statusFilter
            });
        });
    
});
module.exports = router;