const Mongoose = require("mongoose");

// định nghĩa các collections trong database
var schema = new Mongoose.Schema({
    name: 'string',
    status: 'string',
    ordering: 'string',
});
module.exports = Mongoose.model('items', schema);