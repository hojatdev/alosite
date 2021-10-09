var express = require('express');
var router = express.Router();
// var connection = require('./../../db/connection').connection;
const apiAuth = require('../../middlware/apiAuth');


const RegisterUserController = require('../../../controller/soft/back/RegisterUserController');
const ActiveUserController = require('../../../controller/soft/back/ActiveUserController');

const SendListController = require('../../../controller/soft/back/SendListController');
const GetResponseController = require('../../../controller/soft/back/GetResponseController');
/* GET home page. */
// router.get('/', (req, res, next) => {
//     let sql="SELECT * FROM `users` WHERE 1";
//     db.connection.query(sql, (error, results, fields)=> {
//         if (error) throw error;
//         res.send( fields);
//         db.connection.end();
//     });
//     res.render('index', { title: 'Express api v1' });
// });
router.all('/create/user',RegisterUserController.register.bind(RegisterUserController));
router.all('/active/user',apiAuth,ActiveUserController.activeUser);



router.all('/get/List',apiAuth,SendListController.sendList.bind(SendListController));
router.all('/response/order',GetResponseController.getResult.bind(GetResponseController));


module.exports = router;