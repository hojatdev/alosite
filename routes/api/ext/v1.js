var express = require('express');
var router = express.Router();

const SendListController = require('../../../controller/extension/SendListController');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express api extension  v1' });
});
router.all('/get/List',SendListController.sendList.bind(SendListController));


module.exports = router;