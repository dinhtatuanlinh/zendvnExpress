var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('inc/admin/dashboard', { title: 'dashboard page', layout: 'backend'});
});
module.exports = router;