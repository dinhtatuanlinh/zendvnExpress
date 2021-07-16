var express = require('express');
var router = express.Router();
const ItemsModel = require('./../../schemas/items'); // kéo module items trong schemas để truy cập bảng items trong database
const utility = require('./../../helper/utility'); // kéo các hàm trong utility helper vào 

/* GET users listing. */
router.get('(/status/:status)?', async (req, res, next) => {// khi truyền dữ liệu qua đường dẫn để lấy được dữ liệu đấy ta thêm /:status vào router. Nếu ko có dữ liệu truyền trên đường dẫn thì thêm (/:status)? nghĩa là có ý nghĩa là chuỗi được gửi lên có cũng được ko có cũng được
    let statusFilter = [
        {name: 'all', num: null, link: '#', class: 'default'},
        {name: 'active', num: null, link: '#', class: 'default'},
        {name: 'inactive', num: null, link: '#', class: 'default'},
    ];
    
    var sort = {};
    if(req.query.sort !== undefined && req.query.order !== undefined) {
        if(req.query.sort === "name"){
            sort = {name: req.query.order};
        }else if(req.query.sort === "status"){
            sort = {status: req.query.order};
        }
    }
    // change status
    // console.log(req.app.locals.systemConfig) // phương thức req.app.locals dùng để truy cập tới các biến locals được tạo như ở đây là biến locals systemConfig được tạo tại file app.js
    if(req.query.changestatus !== undefined && req.query.changestatus === "1"){
        if (req.query.status === "active"){
            ItemsModel.updateOne({_id: req.query.id}, {status: "inactive"}, (err, affected, res)=>{
                console.log("success");
            })
        }else{
            ItemsModel.updateOne({_id: req.query.id}, {status: "active"}, (err, affected, res)=>{
                console.log("success");
            })
        }
    }
    // search
    var search = "";
    if (req.query.search !== undefined) search = req.query.search; // req.query dùng để lấy dữ liệu search được gửi qua phương thức get
    var where = {};
    // để lấy được dữ liệu trên đường dẫn ta sử dụng req.params.status với status là dữ liệu (/:status)? (console.log(req.params.status))
    var statusCurrent = req.params.status;
    // console.log(statusCurrent);
    if(statusCurrent == undefined) statusCurrent = 'all';
    statusFilter = await utility.statusButton(statusCurrent, statusFilter);// utility trả về async là 1 promise nên cũng phải await ra
    // console.log(statusFilter);
    // pagination
    var pagiParams = await utility.pagiFunc(parseInt(req.query.p), statusFilter[0].num);
    // console.log(pagiParams);
    if(statusCurrent !== 'all') where.status = statusCurrent;// xử lý khi currentstatus bằng all
    // console.log(statusCurrent);
    var addLink = "";
    if(search !== "") {
        addLink = "?search=" + search;
        where.name = new RegExp(search, 'i'); // RegExp là regular expressions giúp tìm document chứa đoạn kí tự search, i là ko phân biệt hoa thường
    }
    
    ItemsModel.find(where)
    .sort(sort)
    .skip(pagiParams.position)
    .limit(pagiParams.itemsPerPage)
    .then(( items) => { // thay bằng phương thức then để xử lý bất đồng bộ
        if(statusCurrent !== undefined) req.flash('success', 'cập nhật status thành công');
        res.render('inc/admin/list', { 
            title: 'abc list page',
            items,
            statusFilter,
            statusCurrent,
            search,
            addLink,
            pagiParams
        });
    });
});
router.post('/changestatus/:status', (req, res, next) => {// lấy dữ liệu gửi lên qua phương thức post
    // console.log(req.params.status);// lấy status truyền trên url
    // console.log(req.body);// phương thức req.body của module body parser dùng để lấy dữ liệu gửi lên tư form post
    ItemsModel.updateMany({_id: {$in: req.body.cid}}, {status: req.params.status}, (err, affected, result)=>{//
        req.flash('success', 'cập nhật status thành công', false);// tham số thứ nhất là info là biến title truyền ra ngoài view, tham số thứ 2 là câu thông báo truyền ra ngoài view, nếu ko render ra giao diện thì phải thêm tham số thứ 3 là false
        res.redirect(`/${req.app.locals.systemConfig.prefixAdmin}`);
    });
});
module.exports = router;