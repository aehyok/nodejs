const path = require('path');
const nodeExternals = require('webpack-node-externals');

const fileName = './app.js';

module.exports = {
  // 指定打包node类型的项目
  target: 'node',
  // 入口文件
  entry: { 'app': fileName },
  module: {
  }
};