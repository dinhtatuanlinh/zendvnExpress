const mongoose = require("mongoose");

const database = require('./database');
database.connect();
// định nghĩa các collections trong database
var schema = new mongoose.Schema({
    role: String,
});
module.exports = mongoose.model('roles', schema);