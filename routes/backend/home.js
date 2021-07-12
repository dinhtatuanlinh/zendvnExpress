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
    var sort = "";
    if(req.query.sort !== undefined) sort = req.query.sort;
    console.log(sort);
    var search = "";
    if (req.query.search !== undefined) search = req.query.search; // req.query dùng để lấy dữ liệu search được gửi qua phương thức get
    var where = {};
    // để lấy được dữ liệu trên đường dẫn ta sử dụng req.params.status với status là dữ liệu (/:status)? (console.log(req.params.status))
    var statusCurrent = req.params.status;
    if(statusCurrent == undefined) statusCurrent = 'all';
    statusFilter = await utility.statusButton(statusCurrent, statusFilter);// utility trả về async là 1 promise nên cũng phải await ra
    // console.log(statusFilter);
    if(statusCurrent !== 'all') where.status = statusCurrent;// xử lý khi currentstatus bằng all
    var addLink = "";
    if(search !== "") {
        addLink = "?search=" + search;
        where.name = new RegExp(search, 'i'); // RegExp là regular expressions giúp tìm document chứa đoạn kí tự search, i là ko phân biệt hoa thường
    }
    // console.log(where);
    ItemsModel.find(where).sort().then(( items) => { // thay bằng phương thức then để xử lý bất đồng bộ
            
            res.render('inc/admin/list', { 
                title: 'abc list page',
                items,
                statusFilter,
                search,
                addLink
            });
        });
    
});
module.exports = router;