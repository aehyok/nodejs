'use strict'

var MongoDB = require('../db/mongo');

// 插入保存数据
exports.save = function(data, callback) {
  new model.save(callback);
};

exports.info = async (ctx, next) => {
  // for(var index=0;index<101;index++)
  // {
  //   var logInfo={"id":index+1,"content":"测试content"+index,"createTime":123};
  //   var result=MongoDB.save("logs",logInfo,function(err,res){
  //       var data=res;
  //   });
  // }
    var logInfo={"id":1,"content":"测试content","createTime":123};
    var result=MongoDB.save("logs",logInfo,function(err,res){
        var data=res;
    });
  }