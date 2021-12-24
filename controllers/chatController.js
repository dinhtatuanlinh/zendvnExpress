const chatModel = require(__pathSchemas + 'database').chatModel;
const roomModel = require(__pathSchemas + 'database').roomModel
    // luu tin nhan gui toi public chat
var savePublicMessage = async(data) => {
    data.time = Date.now(); //them thoi gian gui tin nhan 
    return await new chatModel(data).save();
}
var getMessages = async(roomid) => {
    var publicMessages = [];

    await chatModel.find({ room: roomid }).then((result) => {
        publicMessages = result;

    })
    return publicMessages;
}
var createRoom = async(data) => {
    return await new roomModel(data).save()
}
var getRooms = async() => {
    var rooms = [];
    await roomModel.find({}).then((result) => {
        rooms = result;
    });
    return rooms;
}
module.exports = {
    savePublicMessage,
    getMessages,
    createRoom,
    getRooms
}