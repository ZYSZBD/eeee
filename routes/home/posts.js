var express = require('express');
var monogoClient = require("mongodb").MongoClient;
const DB_STR = "mongodb://localhost:27017/myblog"
var ObjectId = require("mongodb").ObjectId;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// 获取id
	var id = req.query.id;
	monogoClient.connect(DB_STR,function (err, db) {
        if(err){
            res.send(err)
            return;
        }
        var c = db.collection("posts");
        c.find({_id:ObjectId(id)}).toArray(function (err, docs) {
            if(err){
                res.send(err)
                return;
            }
            // 数据和视图一起进行渲染
            res.render('home/article',{data:docs[0]});
        });
    })

});

module.exports = router;