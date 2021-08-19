var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('chat/home', { title: 'dashboard page', layout: __layoutAdmin });
});
module.exports = router;