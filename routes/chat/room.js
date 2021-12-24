var express = require('express');
var router = express.Router();
const chatController = require(__pathControllers + 'chatController');
const socketioRoomChat = require(__pathHelps + 'socketioRoomChat'); // kéo helper socketio


module.exports = (io) => {
    router.get('(/:id)?', async(req, res, next) => {
        var roomID = req.params.id;
        var roomMessages = await chatController.getMessages(roomID);
        res.render('chat/chat', { layout: __layoutChat, roomID, roomMessages });
    });
    socketioRoomChat(io);
    return router;
}