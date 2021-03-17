var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('inc/admin/list', { title: 'abc list page' });
});
module.exports = router;