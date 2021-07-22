const mongoose = require("mongoose");

mongoose.connect('mongodb://tuanlinh:164342816@115.79.35.159:27017/admin');
const connectionDatabase = mongoose.connection;
connectionDatabase.on('error', () => { console.log('connection error') }); // phải dùng function hoặc arrow function ở đây
connectionDatabase.once('open', function() {
    // we're connected! 
    console.log('database connected');
});
var itemsSchema = new mongoose.Schema({
    name: String,
    status: String,
    ordering: Number,
    content: String
});
var rolesSchema = new mongoose.Schema({
    role: String,
});
var usersSchema = new mongoose.Schema({
    name: String,
    status: String,
    ordering: Number,
    content: String
});
connectionDatabase.db.listCollections({})
        .next(function(err, collinfo) {
            if (collinfo) {
                console.log(collinfo);
            }
        });
module.exports = {
    itemsModel: mongoose.model('items', itemsSchema),
    rolesModel: mongoose.model('roles', rolesSchema),
    usersModel: mongoose.model('users', usersSchema),
}
