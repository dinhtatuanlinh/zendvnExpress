const mongoose = require("mongoose");
var connect = () => {
    mongoose.connect('mongodb://tuanlinh:164342816@115.79.35.159:27017/admin');
    const connectionDatabase = mongoose.connection;
    connectionDatabase.on('error', () => { console.log('connection error') }); // phải dùng function hoặc arrow function ở đây
    connectionDatabase.once('open', function() {
        connectionDatabase.db.listCollections({})
            .next(function(err, collinfo) {
                if (collinfo) {
                    console.log(collinfo);
                }
            });
        // we're connected! 

        console.log('database connected');
    });
};

module.exports = { connect: connect };