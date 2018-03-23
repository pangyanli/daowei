const express = require('express');
const router = express.Router();

// 引入4个Model
const getCollection = require('../models');
const Comment = getCollection('comment');
const Item = getCollection('item');
const Service = getCollection('service');
const Shop = getCollection('shop');
const City = getCollection('city');

// 1、设置comment路由,请求comment数据
router.get('/getComment', function(req, res) {
  const page = req.query.page || 0;
  console.log(page)
  const projection = null;   // 映射，如果要传第三个参数，第二个参数必须要传
  const _filter = {
    limit:10,
    sort: '-createtime',  // 默认是升序，使用降序排列
    skip:page * 10   // 一次翻十页
  }
  Comment.find({},projection,_filter,function(err,docs){
   if(!err){
     // console.log(docs)
     res.send(docs)
   }
  })
});

// 2、请求item的路由
router.get('/getItem',function(req,res){
  Item.find({},function(err,docs){
   if(!err){
     // console.log(docs)
     res.send(docs)
   }
  })
})

// 3、请求service数据
router.get('/getService',function(req,res){
  Service.find({}, function(err,docs){
   if(!err){
     // console.log(docs)
     res.send(docs)
   }
  })
})

// 4、请求shop数据
router.get('/getShop',function(req,res){
  Shop.find({},function(err,docs){
    if(!err){
      // console.log(docs)
      res.send(docs)
    }
  })
})

// 5、请求city的数据
router.get('/getCity',function(req,res){
  City.find({},function(err,docs){
    if(!err){
      res.send(docs)
    }
  })
})

module.exports = router;
