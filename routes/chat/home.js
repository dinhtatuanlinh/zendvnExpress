var express = require('express');
var router = express.Router();
const chatController = require(__pathControllers + 'chatController');
const socketioPublicChat = require(__pathHelps + 'socketioPublicChat'); // kéo helper socketio

/* GET users listing. */


module.exports = (io) => {
    router.get('/', async function(req, res, next) {


        var publicMessages = await chatController.getMessages("public");
        var rooms = await chatController.getRooms();
        res.render('chat/home', {
            layout: __layoutChat,
            publicMessages: publicMessages,
            rooms: rooms,

        });
    });
    socketioPublicChat(io);
    return router;
};