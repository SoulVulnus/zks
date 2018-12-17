var mysql = require('mysql');
var pool = mysql.createPool({
    user: 'root',
    password: 'root',
    database: 'startsl',
    connectionLimit: 100
})
module.exports = function(sql, query, fn) { //('select * from userlist where id=?',,function(){})
    fn = fn ? fn : query;
    query = query || [];

    function connectionCallback(error, con) {
        if (error) {
            fn(error)
        } else {
            con.query(sql, query, function(err, results) {
                con.release();
                queryCallback(err, results);
            })
        }
    }

    function queryCallback(err, results) {
        if (err) {
            fn(err);
        } else {
            fn(null, results);
        }
    }
    pool.getConnection(connectionCallback)
}