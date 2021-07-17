var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('(/:id)?', function(req, res, next) {
    if (req.params.id === '') {
        res.render('inc/admin/add', { title: 'add page' });
    } else {

        res.render('inc/admin/add', { title: 'edit page' });
    }
    // '/form(/:id)?'
    // console.log('abc');
    // req.flash('info', 'dinh ta tuan linh');
    // res.send('test flash');
    // res.end();

});
module.exports = router;