const User = require('./../../../db/User');

module.exports = new class RegisterUserController {
    constructor() {
    }
    async register(req,res)
    {
        let user;

        //validate code
        if(!req.body.device_id)
        {
            return res.send('not_valid');
        }
        try {
            user = User.findUserWithCode(req,res,req.body.device_id)
        } catch (err) {
            return res.status(500).send();
        }
        return res.send(user);
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
    test1(req,res)
    {
        return res.json('test1');
    }

}
