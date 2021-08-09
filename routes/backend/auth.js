var express = require("express");
var router = express.Router();

var baselink = __admin + "/" + "admin";
router.get("/", (req, res, next) => {
  // khi truyền dữ liệu qua đường dẫn để lấy được dữ liệu đấy ta thêm /:status vào router. Nếu ko có dữ liệu truyền trên đường dẫn thì thêm (/:status)? nghĩa là có ý nghĩa là chuỗi được gửi lên có cũng được ko có cũng được
  console.log(__admin);
  res.render(`inc/admin/auth`, {
    layout: "auth",
    baselink,
  });
});
router.post("/login", (req, res, next) => {
    console.log(req.params.username, req.params.pass);
    res.render('inc/admin/dashboard', { title: 'dashboard page', layout: __layoutAdmin});
})
module.exports = router;
