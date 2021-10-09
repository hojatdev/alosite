const User = require('./../../../db/User');
module.exports = new class ActiveUserController {
    async activeUser(req, res) {
        return res.send(req.user);
        let result = await User.updateStatusUser(req.user.id, 1);
        if (result.affectedRows) {
            return res.status(200).send('1');
        }
        return res.status(200).send('0');
    }
}
