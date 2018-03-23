# day 01
  ## 使用express创建项目
      1、安装：npm install express-generator -g
      2、express daowei
        生成目录结构如下：
        daowei/
              ├── app.js
              ├── bin
              │   └── www
              ├── package.json
              ├── public    // 放置静态文件目录
              │   ├── images
              │   ├── javascripts
              │   └── stylesheets
              │       └── style.css
              ├── routes    // 放置路由文件目录
              │   ├── index.js
              │   └── users.js
              └── views   // 放置模板引擎的目录
                  ├── error.jade
                  ├── index.jade
                  └── layout.jade
      3、npm install    安装所有依赖            
      4、实现后台实时刷新的
          npm install nodemon
          在package.json配置： "start": "node ./bin/www" -->  "start": "nodemon ./bin/www"
          
  ## Mongoose的使用步骤：
      1.下载安装mongoose
        npm i mongoose --save
      2、创建tools文件夹，创建 connectMDB.js 
      1）.引入mongoose
        var mongoose = require("mongoose");
      2）.连接MongoDB数据库
        如果端口号是27017 则可以省略不写
        mongoose.connect("mongodb://ip地址:端口号/数据库名字",{useMongoClient:true});
        mongoose.connect("mongodb://127.0.0.1/daowei",{useMongoClient:true});
        mongoose.connect("mongodb://localhost/daowei",{useMongoClient:true});
      - 监听数据库的连接状态
          - 在mongoose中有一个属性叫做connection，可以通过监听这个对象来知道数据库的连接或断开

    - 断开数据库连接
        - mongoose.disconnect();
        - MongoDB数据库一旦连接一般不会断开    
    2、删除数据库：
        db    // 查看当前是在哪个数据库
        use 数据库名    // 进入指定的数据库
        db.dropDatabase()    // 删除当前所在的数据库
    3、在Studio 3T 中插入数据
        1）打开Studio 3T  -->  点击Connect按钮 --> connect+ --> 选中mongo，并点击connect按钮
        --> IntelliShell 
        2 ）db  -->  F6 按键   // 查看当前所在的数据库
        3）use daowei   -->  F6 按键   // 创建了一个新的daowei数据库 use 数据库名，如果该数据库以创建，
                    则进入该数据库，如果没有创建，则创建新的该数据库
        4 ）db   -->  F6 按键   查看当前是不是在daowei数据库 是的话执行下面的
        5）db.comment.insert(复制comment.json文件中的数据粘贴，注意开始和结束不要有空格)  --> F6按键
        6）点击daowei数据库下的comment集合，出来db.comment.find({}) --> F6按键，如果下面有数据显示了
            那就说明插入成功了
        7）重复5、6步骤，将item/service/shop其他三个集合页插入到daowei数据库 
  ## 具体流程： 
      一、tools/connectMDB.js  //连接数据库
          var mongoose = require('mongoose')
          mongoose.connect('mongodb://127.0.0.1/daowei');  // 连接到位数据库
          mongoose.connection.on('open', function(){    // 监视数据库的连接状态
            console.log('daowei数据库连接成功!')
          })
      二、models/index.js
          1、引入连接好的数据库 
             require('../tools/connectMDB')   // 连接数据库
             const mongoose = require('mongoose');
             const Schema = mongoose.Schema;
          2、创建多个Schema模型对象 （约束）  
               // 1、创建commentSchema
               const commentSchema = new Schema({
                 "iconUrl":String,
                 "area":String,
                 "city":String,
                 "comment":String,
                 "createtime":Number,
                 "nick":String,
                 "star":Number
               });   // 依次创建itemSchema、serviceSchema、citySchema、shopSchema
          3、映射Model
               // 文档构造函数名，文档约束，database中的集合名(要与数据库的一致，不然就容易出错找不到)
               mongoose.model('comment',commentSchema,'comment')
               mongoose.model('item',itemSchema,'item')
               mongoose.model('service',serviceSchema,'service')
               mongoose.model('shop',shopSchema,'shop')
               mongoose.model('city',citySchema,'city')
          4、统一暴露     
               module.exports = function(collectionName){
                 return mongoose.model(collectionName)
               }
      三、 routes/indexjs   （引入各个Model,通过后台路由，操作数据库，返回数据）       
               const express = require('express');
               const router = express.Router();
               const getCollection = require('../models');   // 引入4个Model
               const Comment = getCollection('comment');
               const Item = getCollection('item');
               const Service = getCollection('service');
               const Shop = getCollection('shop');
               const City = getCollection('city');              
               // 1、设置comment路由,请求comment数据
               router.get('/getComment', function(req, res) {
                 const page = req.query.page || 1;
                 console.log(page)
                 const projection = null;   // 映射，如果要传第三个参数，第二个参数必须要传
                 const _filter = {
                   limit:10,
                   sort: '-createtime',  // 默认是升序，使用降序排列
                   skip:(page-1) * 10   // 一次翻十页
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
# day 02
   ## 一、功能
    1、发请求，使用模版渲染首页数据
   ## 二、问题
      1、模版写好了，数据也能获取到，但是渲染不出来，页面没有东西，页不报错
        原因：调用template()函数时，传参写错了，需要传两个参数：模板名和数据
        错误的写法：$('.box1').append(template('shop_list'),{data:data})); 
        应该这样写：$('.box1').append(template('shop_list',{data:data}));
      2、模板渲染出来了，serviceType出来的样式不对
      文字： 小 时 工 开 荒 保 洁 擦 玻 璃 深 度 保 洁 杀 虫 除 螨 家 居 养 护
      应该是这样的：小时工 开荒保洁 擦玻璃 深度保洁  杀虫除螨 家居养护
      原因：取出来的 serviceType数据有问题，取出来的serviceType的类型是字符串，
             并不是数组，所以遍历出来是一个一个的，这是因为在models中创建shopSchema
             对象的约束时，将serviceType的类型设置成String了，应该是Array就对了
      3、静态页面的二级菜单通过下面的代码实现显示与隐藏的切换，但是用模板渲染出来的页面就不可以了  
           $('.nav_list').hover(function(){
                    // 通过this获得当前的li
                    $(this).children('.nav_content').stop().toggle()
                  })
       原因：这些代码应该写到获取数据的回调函数中，因为数据的异步获取的，如果与获取数据平级写
             的话，浏览器解析到这些代码时，有可能数据还没有获取到，那就无法绑定hover来切换显示了
             所以应该写到获取数据的回调函数中，获取到数据了才绑定
      4、因为布局几乎都是使用flex布局的，大部分都是按百分比布局的，随屏幕宽度来调整的，所以
         当屏幕比较小的时候，有些文字或元素就会换行，布局就乱了
         解决：直接给body设置最大宽度和最小宽度，但是因为我电脑的屏幕比较大，所以我设置的最
         小宽度也很大才可以
          min-width: 1400px;
          max-width: 1600px;
               
   ## 分页的实现
     
               
               
              
               
         
         
         
         
