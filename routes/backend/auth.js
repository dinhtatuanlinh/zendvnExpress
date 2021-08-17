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
router.get("/logout", (req, res, next) => {
    req.logOut(); // để logout tài khoản
    res.redirect(`/${baselink}`);
})
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: `/${__admin}`,
        failureRedirect: `/${baselink}`,
    })
);

passport.use(
    new LocalStrategy(function(username, password, done) {
        // console.log(username, password);
        usersModel.findOne({ username: username }, function(err, user) {
            // console.log(user);
            if (err) {
                return done(err);
            }
            if (user == undefined || user.length == 0) {
                console.log('user ko dung');
                return done(null, false, { message: "Incorrect username." });
            }
            if (password !== user.password) {
                console.log('pass ko dung');
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user); // truyen vao user toi serializeUser
            // });
        })
    }));
passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    usersModel.findOne({ _id: id }, function(err, user) {
        console.log('1');
        console.log(user);
        done(null, user);
    })
});
module.exports = router;