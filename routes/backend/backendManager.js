var express = require('express');
var router = express.Router();


// call child router
router.use('/', require('./home'));
router.use('/add', require('./add'));
router.use('/dashboard', require('./dashboard'));


module.exports = router;