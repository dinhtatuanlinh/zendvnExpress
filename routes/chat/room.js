var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log('room');
    res.render('chat/chat', { title: 'dashboard page', layout: __layoutChat });
});
module.exports = router;