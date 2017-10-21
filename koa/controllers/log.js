'use strict'

var MongoDB = require('../db/mongo');

// 插入保存数据
exports.save = function(data, callback) {
  new model.save(callback);
};

exports.info = async (ctx, next) => {
    var logInfo={"id":1,"content":"测试content","createTime":123};
    var result=MongoDB.save("logs",logInfo,function(err,res){
        var data=res;
    });
  }