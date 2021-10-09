module.exports = new class User {
    constructor() {
    }

    registerUser(req, res) {
        if (!req.body.username  ||!req.body.device_id ||!req.body.rom_size)
        {
            return ;
        }
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '1.1.1.1';

        let email = req.body.device_id+'@soft.com';
        let sql = "INSERT INTO `users`( `name`, `email`, `password`, `code`, `ram`, `ip`, `os`, `num_core_cpu`, `point`, `version`, `status`, `created_at`, `updated_at`) VALUES" +
            " ('"+req.body.username+"','"+email+"','"+req.body.username+"','"+req.body.device_id+"','"+req.body.rom_size+"','"+ip+"','"+req.body.os+"',"+req.body.cpu_core+",0,'"+req.body.version+"',0,now(),now())";
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                console.log(rows);
                resolve(rows);
            });
        });
    }

    findUserWithCode(req, res, code) {
        let sql = 'SELECT * FROM `users` WHERE `code` ="' + code + '"';
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    findUserWithId(req, res, id) {
        let sql = 'SELECT * FROM `users` WHERE `id` ="' + id + '"';
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    updateStatusUser(id, status) {
        let sql = "UPDATE `users` SET `status`=" + status + " WHERE id =" + id + ";";
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    // findUserWithCode2 = async (req, res, code) => {
    //     let sql = 'SELECT * FROM `users` WHERE `code` ="' + code + '"';
    //     return new Promise((resolve, reject) => {
    //
    //     })
    //     return db.connection.query(sql);
    // }
}