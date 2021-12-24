var express = require('express');
var router = express.Router();
const usersModel = require(__pathSchemas + "database").usersModel;


module.exports = (io) => {
    // call child router
    // auth
    router.use('/', async(req, res, next) => {

        if (req.isAuthenticated()) { // isAuthenticated để xác định đã được login rồi hay chưa rồi sẽ trả về true chưa trả về false
            res.locals.userInfo = req.user;
            // get invitation
            var invitation = [];
            await usersModel.find({
                _id: { $in: req.user.friendreqfrom } // lấy các user tồn tại trong mảng friendreqto
            }).select('_id name username').then((result) => {
                // console.log(result);
                invitation = result;
            });
            res.locals.invitation = invitation;
            next();
        } else {
            res.redirect(`/${__admin}/admin`);
        }
    }, require('./home')(io));
    // router.use('/', require('./home')(io));
    // items
    router.use('/room/', require('./room')(io));

    return router;
};