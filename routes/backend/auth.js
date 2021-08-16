var express = require("express");
var router = express.Router();
var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
const usersModel = require(__pathSchemas + "database").usersModel;
var baselink = __admin + "/" + "admin";
router.get("/", (req, res, next) => {
    // khi truyền dữ liệu qua đường dẫn để lấy được dữ liệu đấy ta thêm /:status vào router. Nếu ko có dữ liệu truyền trên đường dẫn thì thêm (/:status)? nghĩa là có ý nghĩa là chuỗi được gửi lên có cũng được ko có cũng được
    // console.log(baselink);
    res.render(`inc/admin/auth`, {
        layout: "auth",
        baselink,
    });
});
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/admin124/roles",
        failureRedirect: `/${baselink}`,
    })
);

passport.use(
    new LocalStrategy(function(username, password, done) {
        // console.log(username, password);
        usersModel.findOne({ username: username }, function(err, user) {
            console.log(user);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            if (password !== user.password) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, true);
            // });
        })
    }));
module.exports = router;