const mongoose = require("mongoose");

const connect = require('./database');
connect();
// định nghĩa các collections trong database
var schema = new mongoose.Schema({
    name: String,
    status: String,
    ordering: Number
});
module.exports = mongoose.model('items', schema);