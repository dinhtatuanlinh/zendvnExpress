var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('chat/home', { title: 'dashboard page', layout: __layoutChat });
});
router.get('/room', function(req, res, next) {
    res.render('chat/chat', { title: 'dashboard page', layout: __layoutChat });
});
module.exports = router;