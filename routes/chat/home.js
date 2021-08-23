var express = require('express');
var router = express.Router();

/* GET users listing. */


module.exports = (io) => {
    router.get('/', function(req, res, next) {
        console.log(__layoutChat);
        res.render('chat/home', { title: 'dashboard page', layout: __layoutChat });
    });
    // socket.io events
    io.on("connection", (socket) => {
        socket.emit("server_send_data", socket.id);
        console.log("a user connected");
        socket.on('client_send_all_message', (data) => {
            console.log(data);
        })
    });
    return router;
};