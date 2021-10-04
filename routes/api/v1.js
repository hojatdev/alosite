var express = require('express');
var router = express.Router();
// var connection = require('./../../db/connection').connection;

const RegisterUserController = require('../../controller/soft/back/RegisterUserController');

/* GET home page. */
router.get('/', function(req, res, next) {
    let sql="SELECT * FROM `users` WHERE 1";
    db.connection.query(sql, (error, results, fields)=> {
        if (error) throw error;
        res.send( fields);
        db.connection.end();
    });
    res.render('index', { title: 'Express api v1' });
});
router.all('/get/user',RegisterUserController.register );

module.exports = router;