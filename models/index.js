/*
    创建模型
 */
require('../tools/connectMDB')   // 连接数据库
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1、创建commentSchema
const commentSchema = new Schema({
  "iconUrl":String,
  "area":String,
  "city":String,
  "comment":String,
  "createtime":Number,
  "nick":String,
  "star":Number
});

// 2、创建itemSchema
const itemSchema = new Schema({
  "id":String,
  "title":String,
  "name":String,
  "desc":String,
  "price":Number,
  "oldPrice":Number,
  "orderCount":Number,
  "soldCount":Number,
  "commentCount":Number,
  "accept":String,
  "praise":String,
  "imgUrl":String,
  "company":String,
  "profile":String
});

// 3、创建serviceSchema
const serviceSchema = new Schema({
  "id":String,
  "title":String,
  "orderCount":Number,
  "positiveRate":String,
  "imgUrl":String
});

// 4、创建年shopSchema
const shopSchema = new Schema({
  "serviceIndex":String,
  "serviceType": Array,
  "shopList": Array
});
// 5、创建citySchema
const citySchema = new Schema({
  "name":String
})

// 文档构造函数名，文档约束，database中的集合名
mongoose.model('comment',commentSchema,'comment')
mongoose.model('item',itemSchema,'item')
mongoose.model('service',serviceSchema,'service')
mongoose.model('shop',shopSchema,'shop')
mongoose.model('city',citySchema,'city')

module.exports = function(collectionName){
  return mongoose.model(collectionName)
}