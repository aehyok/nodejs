var toBid = require('../schemas').toBid;

// 插入数据
exports.save = function(data, callback) {
  new toBid(data).save(callback);
};