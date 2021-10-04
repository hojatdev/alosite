var express = require('express');
var router = express.Router();
var connection = require('./../../db/connection').connection;

const TestController = require('./../../controller/TestController');

/* GET home page. */
router.get('/', function(req, res, next) {
    let sql="SELECT * FROM `node` WHERE 1";
    connection.query(sql, (error, results, fields)=> {
        if (error) throw error;
        res.send( fields);
    });
    // res.render('index', { title: 'Express api v1' });
});
router.get('/test1',TestController.test1 );

module.exports = router;