var express = require("express");
var router = express.Router();
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

var baselink = __admin + "/" + "admin";
router.get("/", (req, res, next) => {
  // khi truyền dữ liệu qua đường dẫn để lấy được dữ liệu đấy ta thêm /:status vào router. Nếu ko có dữ liệu truyền trên đường dẫn thì thêm (/:status)? nghĩa là có ý nghĩa là chuỗi được gửi lên có cũng được ko có cũng được
  //   console.log(__admin);
  res.render(`inc/admin/auth`, {
    layout: "auth",
    baselink,
  });
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/admin124/items",
  }),(req, res, next)=>{
      res.redirect(`/${req.app.locals.systemConfig.prefixAdmin}`);
  }
);

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log(username, password);
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     return done(null, false, { message: "Incorrect username." });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: "Incorrect password." });
    //   }
    return done(null, user);
    // });
  })
);
module.exports = router;
