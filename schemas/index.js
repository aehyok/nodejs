
var mongoose = require('mongoose');
var db_url="mongodb://192.168.1.100:27017/aehyok";
//https://github.com/54sword/api.xiaoduyu.com  express Mongoose处理参考Github上的开源项目

//mongoose connection打开
mongoose.connect(db_url, {useMongoClient: true},
	function (error) {  //回调函数
		if (error) {
			console.error('connect to %s error: ', db_url, error.message);
			process.exit(1);
		}
});

//如果连接成功会执行error回调
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
//如果连接成功会执行open回调
db.connection.on("open", function () {
    console.log("数据库连接成功");
});



require('./toBid');

exports.toBid = mongoose.model('BidProduct');
