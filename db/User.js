module.exports = new class User {
    constructor() {
    }
    findUserWithCode(req,res,code)
    {
        // return res.send(code);
        let sql='SELECT * FROM `users` WHERE `code` ="'+code+'"';
        db.connection.query(sql, (error, results, fields)=> {
            if (error) throw error;
            if (results != '' && results)
            {
                return results;
            }
            return false;
        });
    }


}