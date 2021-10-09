const User = require('../../../db/User');
module.exports = new class UserController {
    async getPointUser(req, res) {
        return res.send(req.user.point);
    }
}
