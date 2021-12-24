const chatController = require(__pathControllers + "chatController");
const onlineUserManipulation = require(__pathHelps + "onlineUserManipulation");

module.exports = (io) => {
    let users = new onlineUserManipulation();
    // socket.io events
    io.on("connection", (socket) => {
        // socket.emit("server_send_data", socket.id);//trả tin nhắn tới 1 user hiện tại
        socket.on("user_join_room", (data) => {
            socket.join(data.roomID); // join vào room thì chỉ những user join vào thì mới nhận được tin nhắn
            users.addUser(socket.id, data.username, data.roomID);

            io.to(data.roomID).emit("online_room_users", users.getListUser(data.roomID));
        });

        //disconnect user
        socket.on("disconnect", () => {

            let user = users.removeUser(socket.id);
            if (user) {
                io.to(user.roomID).emit("online_room_users", users.getListUser(user.roomID));
            }

        });
        // end disconnect user
        // nhận tin nhắn từ user gửi lên cho public
        socket.on("client_send_room_message", async(data) => {
            await chatController.savePublicMessage(data)
                // to all clients in room1 and/or room2 except the sender
                // socket.to(["room1", "room2"]).emit( /* ... */ );

            io.to(data.room).emit("server_return_room_message", data); // trả tin nhắn tới tất cả user

        });
        // socket.on("client_typing", (data) => {
        //   socket.broadcast.emit('server_send_user_typing', { username: data.username }) // send message tới các user ngoại trừ user gửi tin nhắn
        // });

        // nhận online user từ client truyền lên
        // socket.on("new_online_user", (data) => {
        //     socket.id;
        //     //add online user
        //     users.addUser(socket.id, data.username);
        //     //send online users to client
        //     io.emit("online_users", users.getListUser());
        // });

    });
};