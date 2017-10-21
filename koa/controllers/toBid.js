'use strict'

var toBid = require('../models/toBid');
var mongoose =  require('mongoose');
var model=mongoose.model('BidProduct');

//Mongoose 基本操作和API列表  https://cnodejs.org/topic/51ff720b44e76d216afe34d9

// 插入保存数据
exports.save = function(data, callback) {
  new toBid(data).save(callback);
};

exports.findAll=function(data,callback){
    var result= model.find({},function(error,docs)
    {
        if(!error)
        {
          return docs;
        }
    });
}

//NodeJs升级 async和await的使用
exports.find = async (context, next) => {
  var query = model.find({});
	var res = []
	await query.exec(function(err, data) {
		if(err) {
			res = []
		}else {
      res = data;
    }
    context.body = {
      success: true,
      res
    }
	})
}


exports.findss = async () => {
	var query = model.find({});
	var res = []
	await query.exec(function(err, data) {
		if(err) {
			res = []
		}else {
			res = data;
		}
	})
	return res;
}