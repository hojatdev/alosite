var express = require('express');
var router = express.Router();

const apiBackV1 = require('./api/v1/back');
const apiFrontV1 = require('./api/v1/front');
const extV1 = require('./api/ext/v1');

router.use('/v1',apiBackV1);
router.use('/v1/front',apiFrontV1);
router.use('/ext/v1',extV1);

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express api ' });
// });
module.exports = router;
