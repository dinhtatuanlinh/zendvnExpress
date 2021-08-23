var express = require('express');
var router = express.Router();

/* GET users listing. */


module.exports = (io) => {
    router.get('/', function(req, res, next) {
        res.render('chat/home', { title: 'dashboard page', layout: __layoutChat });
    });
    // socket.io events
    io.on("connection", (socket) => {
        socket.emit("server_send_data", socket.id);
        console.log("a user connected");
    });
};