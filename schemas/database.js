const mongoose = require("mongoose");
var connect = () => {
    mongoose.connect('mongodb://tuanlinh:164342816@115.79.35.159:27017/admin');
    const db = mongoose.connection;
    db.on('error', () => { console.log('connection error') }); // phải dùng function hoặc arrow function ở đây
    db.once('open', function() {
        db.listCollections({})
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