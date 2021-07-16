var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.flash('info', 'dinh ta tuan linh');
    res.send('test flash');
    res.end();
    // res.render('inc/admin/add', { title: 'add page' });
});
module.exports = router;