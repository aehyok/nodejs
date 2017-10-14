//http://www.expressjs.com.cn/guide/routing.html 指引
var express = require('express');
var upload = require('./qiniu/upload');
var app = express();

app.use('/qiniu', upload);

app.listen(3000);
