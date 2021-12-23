const mongoose = require('mongoose');
const { user } = require('../models/user')
// 连接数据库的url
mongoose.connect("mongodb://139.186.205.7:27017/aehyok");

// 监听数据库连接状态，连接成功则可进行数据库操作
mongoose.connection.on("open", (err) => {
    if (err) {
        console.log(err)
        return;
    }
    console.log('数据库连接成功')
    console.log('操作数据库')
})

const createRes = user.create({
    account: 'aehyok',
    status: 1
});
console.log(createRes, 'createRes')