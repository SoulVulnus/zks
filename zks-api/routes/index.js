var express = require('express');
var router = express.Router();

var mysql = require("./mysql/query.js")
var sql = require("./mysql/sql.js")
    /* GET home page. */
router.post('/', function(req, res, next) {
    var cid = req.body.cid
    if (!cid) {
        res.json({ code: 0, msg: "参数不能为空" })
    } else {
        query(sql.SELECTALL, [cid], function(err, results) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                res.json({ code: 1, msg: results })
            }
        })
    }
});

module.exports = router;