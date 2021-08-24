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

    // router.use('/', require('./home')(io));
    // items
    router.use('/room/', require('./room'));
    // socket.io events
    // io.on("connection", (socket) => {
    //     socket.emit("server_send_data", socket.id);
    //     console.log("a user connected");
    //     socket.on('client_send_all_message', (data) => {
    //         console.log(data);
    //     })
    // });
    return router;
};