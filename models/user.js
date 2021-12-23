const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  account: String,
  mobile: String,
  password: String,
  realName: String,
  orgId: String,
  createdBy: String,
  createdAt: Number,
  updatedBy: String,
  updatedAt: Number,
  isDeleted: { type: Boolean, default: false },
  avatarUrl: String // 用户头像
}, { timestamps: true, collection: 'user' });

const user = mongoose.model('userSchema', schema, 'user');

module.exports = {
  user
}