/*
    专门用来负责连接数据库
 */

var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/daowei');  // 连接到位数据库

mongoose.connection.on('open', function(){    // 监视数据库的连接状态
  console.log('daowei数据库连接成功!')
})