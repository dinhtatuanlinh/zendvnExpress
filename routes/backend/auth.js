var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  // khi truyền dữ liệu qua đường dẫn để lấy được dữ liệu đấy ta thêm /:status vào router. Nếu ko có dữ liệu truyền trên đường dẫn thì thêm (/:status)? nghĩa là có ý nghĩa là chuỗi được gửi lên có cũng được ko có cũng được

  res.render(`inc/admin/auth`, {
    layout: 'auth',
  });
});
module.exports = router;