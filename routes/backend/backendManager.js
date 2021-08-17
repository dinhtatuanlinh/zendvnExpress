var express = require('express');
var router = express.Router();


// call child router
// auth
router.use('/admin', require('./auth')); // đặt lên trên router có check login thì sẽ ko bị check khi login
router.use('/', (req, res, next) => {
    if (req.isAuthenticated()) { // isAuthenticated để xác định đã được login rồi hay chưa rồi sẽ trả về true chưa trả về false
        next();
    } else {
        res.redirect(`/${__admin}`);
    }
}, require('./dashboard'));
// router.use('/all', require('./home'));

// items
router.use('/items/', require('./items'));
// users
router.use('/users/', require('./users'));
// roles
router.use('/roles/', require('./roles'));
module.exports = router;