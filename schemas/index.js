
var mongoose = require('mongoose');
var db_url="mongodb://192.168.1.100:27017/aehyok";
//https://github.com/54sword/api.xiaoduyu.com  express Mongoose处理参考Github上的开源项目

//mongoose connection打开
mongoose.connect(db_url, {useMongoClient: true},
	function (error) {  //回调函数
		if (error) {
			console.error('connect to %s error: ', config.db_url, error.message);
			process.exit(1);
		}
});



require('./toBid');

exports.toBid = mongoose.model('BidProduct');
