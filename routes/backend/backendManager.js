var express = require('express');
var router = express.Router();


// call child router

router.use('/dashboard', require('./dashboard'));
// router.use('/all', require('./home'));
// items
router.use('/items/', require('./items'));
// users
router.use('/users/', require('./users'));
// roles
router.use('/roles/', require('./roles'));
module.exports = router;
