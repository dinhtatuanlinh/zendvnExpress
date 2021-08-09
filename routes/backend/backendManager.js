var express = require('express');
var router = express.Router();


// call child router

router.use('/', require('./dashboard'));
// router.use('/all', require('./home'));
// auth
router.use('/admin', require('./auth'));
// items
router.use('/items/', require('./items'));
// users
router.use('/users/', require('./users'));
// roles
router.use('/roles/', require('./roles'));
module.exports = router;
