module.exports = new class Alexa {
    async getListDataBase(req, res,country,status,num) {

        await this.updateHourOrders();
        await this.updateStatusOrders()
        let sql = `select FLOOR(((countIpPerDay/16)-totalHitsHour)/(countIpPerDay)*100) as total,url,id from alexas where\`status\` =${status} and \`location\`='${country}' AND (\`totalHitsToday\` < \`countIpPerDay\` AND \`totalHits\` < \`countIp\`) AND \`dateHour\` > NOW() - INTERVAL 1 HOUR 
        order by \`total\` desc limit ${num}`;
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
        let sql = 'UPDATE `alexas` SET  `dateHour`= NOW(),`totalHitsHour`=0 WHERE `status` = 1 AND alexas.dateHour < DATE_SUB(NOW(), INTERVAL 1 hour)';
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    updateStatusOrders(req, res, id) {
        let sql = 'UPDATE `alexas` SET  `status`= 2 WHERE `totalHits` >= `countIp`';
        return new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    async updateDataAnalyzeAlexa(req,res,listId)
    {
        let sql = 'UPDATE `alexas` SET `totalHits`=`totalHits`+1,`totalHitsToday`=`totalHitsToday`+1,`totalHitsHour`=`totalHitsHour`+1  WHERE `id` IN ' + listId + ')';
        return await new Promise((resolve, reject) => {
            db.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }



}