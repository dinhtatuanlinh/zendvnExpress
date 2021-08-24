var express = require('express');
var router = express.Router();

/* GET users listing. */


module.exports = (io) => {
    router.get('/', function(req, res, next) {
        res.render('chat/home', { title: 'dashboard page', layout: __layoutChat });
    });

    return router;
};