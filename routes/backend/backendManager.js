var express = require('express');
var router = express.Router();


// call child router

router.use('/dashboard', require('./dashboard'));
// router.use('/all', require('./home'));
// items
router.use('/items/', require('./items'));

module.exports = router;