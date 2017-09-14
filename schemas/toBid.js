var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//定义Schema模型
var BidSchema = new Schema({
    pid:Number,
    gid:Number,
    pname:String,
    price:Number,
    auction_price:Number,
    goods_image_url:String,
    duration:Number,
    insert_date: { type: Date, default: Date.now }
});

//唯一索引
BidSchema.index({ pid: 1 }, { unique: true });

mongoose.model('BidProduct', BidSchema);