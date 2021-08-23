var express = require('express');
var router = express.Router();




module.exports = (io) => {
    // call child router
    // auth
    router.use('/', (req, res, next) => {

        if (req.isAuthenticated()) { // isAuthenticated để xác định đã được login rồi hay chưa rồi sẽ trả về true chưa trả về false
            res.locals.userInfo = req.user;
            next();
        } else {
            res.redirect(`/${__admin}/admin`);
        }
    }, require('./home')(io));
    // items
    router.use('/room/', require('./room'));

    return router;
};