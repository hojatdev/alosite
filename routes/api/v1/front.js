var express = require('express');
var router = express.Router();
const apiAuth = require('../../middlware/apiAuth');

const UserController = require('../../../controller/soft/front/UserController')


router.all('/get/point/user',apiAuth,UserController.getPointUser);


module.exports = router;