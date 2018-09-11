var express = require('express');
var monogoClient = require("mongodb").MongoClient;
const DB_STR = "mongodb://localhost:27017/myblog"
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 连接数据库，获取数据
    monogoClient.connect(DB_STR,function (err, db) {
        if (err){
            res.send(err)
            return;
        }
        // 获取文章集合 posts
        var c = db.collection('posts');
        c.find().toArray(function (err, docs) {
            if (err){
                res.send(err)
                return;
            }
            // 同时获取分类的数据
            var c1 = db.collection('cats');
            c1.find().toArray(function (err, result){
                if (err){
                    res.send(err)
                    return;
                }
                res.render('home/index', { data: docs,data1:result });
            });

        });
    })

});

module.exports = router;
