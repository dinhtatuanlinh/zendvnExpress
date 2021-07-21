const mongoose = require("mongoose");

const database = require('./database');
database.connect();
// định nghĩa các collections trong database
var schema = new mongoose.Schema({
    name: String,
    status: String,
    ordering: Number,
    content: string
});
module.exports = mongoose.model('items', schema);