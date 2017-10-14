//七牛云地址 https://github.com/qiniu/nodejs-sdk
var express = require('express');
var router = express.Router();
let qiniu = require('qiniu');

//七牛云 AK和SK
qiniu.conf.ACCESS_KEY = 'TWRriEkY-rhTen4Mn5n88GpYYFwOXR8RecCyJFlp';
qiniu.conf.SECRET_KEY = 'IIgxowC3Dx1Mb0Acy4-IchyDC2P_F8PC8on-ENeX';

//存储空间
var bucket='aehyok';

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

//传递参数
router.get('/Upload/:filePath', function(req, res, next) {
    var filePath=req.params.filePath;

    var accessKey = qiniu.conf.ACCESS_KEY;
    var secretKey = qiniu.conf.SECRET_KEY;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var putPolicy = new qiniu.rs.PutPolicy({
    scope: bucket
    });

    var uploadToken = putPolicy.uploadToken(mac);
    console.log(uploadToken);

    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z0;
    // 是否使用https域名
    //config.useHttpsDomain = true;
    // 上传是否使用cdn加速
    //config.useCdnDomain = true;

    var localFile = "qiniu.png";
    var resumeUploader = new qiniu.resume_up.ResumeUploader(config);
    var putExtra = new qiniu.resume_up.PutExtra();
    // 扩展参数
    putExtra.params = {
      "x:groupName": "KindEditor"
    }
    putExtra.fname = 'testfile.png';
    // 如果指定了断点记录文件，那么下次会从指定的该文件尝试读取上次上传的进度，以实现断点续传
    //putExtra.resumeRecordFile = 'progress.log';
    var key = null;
    // 文件分片上传
    resumeUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
    res.send(filePath);
});  

module.exports = router;


