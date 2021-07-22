const mongoose = require("mongoose");

const database = require('./database');
database.connect();
// định nghĩa các collections trong database
database.listCollections({})
    .next(function(err, collinfo) {
        if (collinfo) {
            console.log(collinfo);
        }
    });
var schema = new mongoose.Schema({
    role: String,
});
module.exports = mongoose.model('roles', schema);