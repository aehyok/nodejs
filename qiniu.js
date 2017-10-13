//七牛云地址 https://github.com/qiniu/nodejs-sdk
let qiniu = require('qiniu');
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'TWRriEkY-rhTen4Mn5n88GpYYFwOXR8RecCyJFlp';
qiniu.conf.SECRET_KEY = 'IIgxowC3Dx1Mb0Acy4-IchyDC2P_F8PC8on-ENeX';

var bucket="aehyok";

var key="aehyok.png"; 
  //构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}
//生成上传 Token
token = uptoken(bucket, key);

  var filePath = 'qiniu.png'
  var key="my-nodejs-logo.png";
  function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
      qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
          // 上传成功， 处理返回值
          console.log(ret.hash, ret.key, ret.persistentId);       
        } else {
          // 上传失败， 处理返回代码
          console.log(err);
        }
    });
  }
  //调用uploadFile上传
  uploadFile(uploadToken, key, filePath);