var toBid = require('../schemas').toBid;

//Mongoose 基本操作和API列表  https://cnodejs.org/topic/51ff720b44e76d216afe34d9

// 插入数据
exports.save = function(data, callback) {
  new toBid(data).save(callback);
};