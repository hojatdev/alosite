const User = require('./../../../db/User');
const Service = require('./../../../db/Service');

const Controller = require('./../../../controller/Controller');

module.exports = new class GetResponseController extends Controller {
    async getResult(req, res) {
        if ( !req.body.orders ||!req.body.userAgent) {
            return res.status(500).json('not_valid');
        }

        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '1.1.1.1';
        ip = req.body.userAgent + ip;
        let id = this.Base64decode(req.body.user_id);
        let user = await User.findUserWithId(req, res, id);
        if (!!user.length) {
            if (this.generateCode(user[0].code) !== req.body.code) {
                return res.status(401).send('not authorize code');
            }

            let splitData = req.body.orders.slice(1, -1).split(',');
            await splitData.forEach( item => {
                Service.updateResultStatusAnalyze(req,res,item,ip,user[0].id).then(rows => {
                        if (rows != '' && rows)
                        {
                            console.log(rows);
                        }
                        return res.send('not exisit user');
                });
                // console.log(resultUpdate);

                // if (resultUpdate.affectedRows)
                // {
                    // console.log(resultUpdate);
                    // return res.status(200).send('klj');

                    // let sql2 = `UPDATE \`orders\` SET \`total_hits_success\`=\`total_hits_success\`+1 WHERE \`orderable_id\`=${item} AND \`orderable_type\`='App\Models\Service'`;
                    // db.connection.query(sql, (error, results, fields) => {
                    //     if (error) console.log(error) ;
                    // });
                // }
                // let sql = `UPDATE \`analyz_orders\` SET \`status_visit\`=1 WHERE \`order_id\` =${item} AND \`user_id\`= ${user[0].id} AND \`ip\`='${ip}' AND \`status_visit\`=0`;
                // db.connection.query(sql, (error, results, fields) => {
                //     if (error) console.log(error);
                //     console.log(results)
                //     if (results.affectedRows)
                //     {
                //         let sql2 = `UPDATE \`orders\` SET \`total_hits_success\`=\`total_hits_success\`+1 WHERE \`orderable_id\`=${item} AND \`orderable_type\`='App\Models\Service'`;
                //         db.connection.query(sql, (error, results, fields) => {
                //             if (error) console.log(error) ;
                //         });
                //     }
                // });

                // if (result.affectedRows) {
                //     return res.status(200).send('1');
                // }
                //update order


                //update user
                // console.log(item);
            });
            return res.status(200).send(req.body.orders.slice(1,-1).split(','));

            if (result.affectedRows) {
                return res.status(200).send('1');
            }
            return res.status(200).send('0');
        }
        return res.status(500).send('not_exists_user');

    }


}
