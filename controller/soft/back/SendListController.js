const User = require('./../../../db/User');
const Service = require('./../../../db/Service');
const Controller = require('./../../../controller/Controller');
module.exports = new class SendListController extends Controller {
    async sendList(req, res) {
        if (!req.body.userAgent || !req.body.platform) {
            return res.status(500).json('not_valid_data');
        }
        let num = req.body.num || 10;
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '1.1.1.1';
        ip = req.body.userAgent + ip;
        if (req.user.status !== 1) {
            return res.status(402).send('not active user');
        }
        let list = await Service.getListDataBase(req, res, ip, num, req.body.platform);
        if (!!list.length) {
            let listId = '(';
            let insertString = '';
            list.forEach(function (arrayItem) {
                insertString += "(null," + arrayItem.OrderId + "," + req.user.id + ",'" + ip + "',0,now(),now()),";
                listId += arrayItem.OrderId + ',';
            });
            insertString = 'INSERT INTO `analyz_orders` (`id`, `order_id`, `user_id`, `ip`, `status_visit`, `created_at`, `updated_at`) VALUES ' + insertString;
            insertString = insertString.slice(0, -1);
            listId = 'UPDATE `services` SET `totalHits`=`totalHits`+1,`totalHitsToday`=`totalHitsToday`+1,`totalHitsHour`=`totalHitsHour`+1  WHERE `id` IN ' + listId.slice(0, -1) + ')';
            await new Promise((resolve, reject) => {
                db.connection.query(insertString, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
            await new Promise((resolve, reject) => {
                db.connection.query(listId, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
        }
        return res.send(list);
    }


}
