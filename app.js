'use strict'
//https://github.com/ivonzhang/koa2-mongodb-server
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const db_url="mongodb://192.168.1.100:27017/aehyok";

/**
 * mongoose连接数据库
 * @type {[type]}
 */
mongoose.Promise = require('bluebird')
//mongoose connection打开
mongoose.connect(db_url, {useMongoClient: true});

//如果连接成功会执行error回调
mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

//如果连接成功会执行open回调
mongoose.connection.on("open", function () {
    console.log("数据库连接成功");
});



/**
 * 获取数据库表对应的js对象所在的路径
 * @type {[type]}
 */
const models_path = path.join(__dirname, '/koa/models')


/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
var walk = function(modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      //var stat = fs.stat(filePath);
      var stat = fs.statSync(filePath);

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)

require('babel-register')
const Koa = require('koa')
//const logger = require('koa-logger')
////const session = require('koa-session')
//const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.keys = ['zhangivon']
//app.use(logger())
//app.use(session(app))
//app.use(bodyParser())


/**
 * 使用路由转发请求
 * @type {[type]}
 */
const router = require('./config/router')()

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`first ${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`second ${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});

app
  .use(router.routes())
  .use(router.allowedMethods());



app.listen(3000)
console.log('app started at port 3000...');