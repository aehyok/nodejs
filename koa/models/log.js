var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//定义Schema模型
var BidSchema = new Schema({
    id:Number,
    content:String,
    insert_date: { type: Date, default: Date.now }
});

//唯一索引
BidSchema.index({ id: 1 }, { unique: true });

mongoose.model('log', BidSchema);