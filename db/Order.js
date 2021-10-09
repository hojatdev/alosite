module.exports = new class Orders {
    async getListDataBase(req, res,country,status,num) {
        return  db.connection.beginTransaction(function(err) {
            if (err) { throw err; }
            db.connection.query('INSERT INTO posts SET title=?', title, function (error, results, fields) {
                if (error) {
                    return connection.rollback(function() {
                        throw error;
                    });
                }

                var log = 'Post ' + results.insertId + ' added';

                db.connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function() {
                            throw error;
                        });
                    }
                    db.connection.commit(function(err) {
                        if (err) {
                            return connection.rollback(function() {
                                throw err;
                            });
                        }
                        console.log('success!');
                    });
                });
            });
        });

    }
}







