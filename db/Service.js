module.exports = new class Service {
    constructor() {
    }

    async getListDataBase(req, res, ip, num = 10, platform = 0) {

        await this.updateHourOrders();
        await this.updateStatusOrders()
        let sql = "SELECT id as OrderId," +
            "mainPageUrl," +
            "mainPageTime," +
            "FLOOR(((countIpPerDay/16)-totalHitsHour)/(countIpPerDay/16)*100) as total," +
            "`event`," +
            "eventTime," +
            "eventType," +
            "eventData," +
            "eventPercent," +
            "SubPageCount," +
            "SubPageTime ," +
            "SubPageType ," +
            "SubPageData ," +
            "`source`," +
            "platform," +
            " SubPageCount FROM services where" +
            " totalHitsToday < countIpPerDay AND" +
            " platform =0 AND" +
            " status = 1 AND dateHour > DATE_SUB(NOW(), INTERVAL 1 hour) AND" +
            " NOT EXISTS (" +
            "SELECT * FROM `analyz_orders` WHERE "+
            " analyz_orders.order_id = services.id AND"+
            " analyz_orders.ip ='"+ip+"') ORDER BY total DESC LIMIT "+num;
        // console.log(sql);
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                // console.log(rows);
                resolve(rows);
            });
        });
    }

    updateHourOrders(req, res, code) {
        let sql = 'UPDATE `services` SET  `dateHour`= NOW(),`totalHitsHour`=0 WHERE `status` = 1 AND services.dateHour < DATE_SUB(NOW(), INTERVAL 1 hour)';
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    updateStatusOrders(req, res, id) {
        let sql = 'UPDATE `services` SET  `status`= 2 WHERE `totalHits` >= `countIp`';
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    runQueryService(req,res,query)
    {
        let sql = query;
        console.log(query);
        return;
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    updateResultStatusAnalyze(req,res,id,ip,userId)
    {
        let sql = `UPDATE \`analyz_orders\` SET \`status_visit\`=1 WHERE \`order_id\` =${id} AND \`user_id\`= ${userId} AND \`ip\`='${ip}' AND \`status_visit\`=0`;
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);

            });
        });
    }



}