const User = require('./../../../db/User');
const Controller = require('./../../../controller/Controller');
module.exports = new class RegisterUserController extends Controller {
    async register(req, res) {
        if (!req.body.device_id) {
            return res.status(500).json('not_valid');
        }
        let user = await User.findUserWithCode(req, res, req.body.device_id);
        if (!!user.length) {
            console.log('user ==>' + user);
            await User.updateStatusUser(user[0].id, 0);
            return res.status(200).send(this.Base64encode(user[0].id));
        }
        user = await User.registerUser(req, res);
        if (!!user) {
            return res.status(200).send(this.Base64encode(user.insertId));
        }
        return res.status(200).send('registered');

        // User.findUserWithCode(req,res,req.body.device_id).then(rows => {
        //     if (rows != '' && rows)
        //     {
        //         let wew = Buffer.from(rows[0]['name']).toString('base64')
        //         return res.send(wew);
        //     }
        //     return res.send('not exisit user');
        // } );

        // User.findUserWithCode2(req, res, req.body.device_id).then(rows => {
        //     if (rows) {
        //         console.log(rows)
        //         //let wew = Buffer.from(rows[0]['name']).toString('base64')
        //         res.send(JSON.stringify(JSON.parse(rows)));
        //     }
        //     return res.send('not exisit user');
        // }).catch(e => {
        //     console.log(e);
        //     res.send(e);
        // });
        //
        // try {
        // } catch (err) {
        //     return res.status(500).send();
        // }
        // return res.send(user);
        // if(user)
        // {
        //get

        // }
        // return res.send('no user');
        //create user


        // return res.send(req.body.device_id);

        //check exists user if not exists create user
        //return code base 64


    }


}
