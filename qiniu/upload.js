//七牛云地址 https://github.com/qiniu/nodejs-sdk
var express = require('express');
var router = express.Router();
let qiniu = require('qiniu');

var path = require('path')
var QRCode = require('qrcode')

//七牛云 AK和SK
qiniu.conf.ACCESS_KEY = 'TWRriEkY-rhTen4Mn5n88GpYYFwOXR8RecCyJFlp';
qiniu.conf.SECRET_KEY = 'IIgxowC3Dx1Mb0Acy4-IchyDC2P_F8PC8on-ENeX';

var accessKey = qiniu.conf.ACCESS_KEY;
var secretKey = qiniu.conf.SECRET_KEY;
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;
// 是否使用https域名
//config.useHttpsDomain = true;
// 上传是否使用cdn加速
//config.useCdnDomain = true;

//存储空间
var bucket='aehyok';

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.get('/download/',function(req,res,next){
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    var options = {
      limit: 10,
      prefix: '',
    };
    
    bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
    if (err) {
      console.log(err);
      throw err;
    }
  
    if (respInfo.statusCode == 200) {
      //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
      //指定options里面的marker为这个值
      var nextMarker = respBody.marker;
      var commonPrefixes = respBody.commonPrefixes;
      console.log(nextMarker);
      console.log(commonPrefixes);
      var items = respBody.items;
      res.send(items);
      items.forEach(function(item) {
        console.log(item.putTime);
        console.log(item.hash);
        console.log(item.fsize);
        console.log(item.mimeType);
        console.log(item.endUser);
        console.log(item.type);
      });
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
});
});


router.get('/',function(req,res,next){
  QRCode.toDataURL('I am a pony!', function (err, url) {
    console.log(url)
  })
})

//传递参数
router.get('/Upload/:filePath', function(req, res, next) {
    var filePath=req.params.filePath;

    var putPolicy = new qiniu.rs.PutPolicy({
    scope: bucket
    });
    var pathName='';

    pathName=path.resolve(__dirname, '../..')+'\\UploadImages\\'+filePath;
    var uploadToken = putPolicy.uploadToken(mac);
    console.log(uploadToken);


    var resumeUploader = new qiniu.resume_up.ResumeUploader(config);
    var putExtra = new qiniu.resume_up.PutExtra();
    var contentArray=filePath.split('.');
    // 扩展参数
    putExtra.params = {
      "groupType": "KindEditor",
      "groupName":"测试"

    }
    putExtra.fname = filePath;
    // 如果指定了断点记录文件，那么下次会从指定的该文件尝试读取上次上传的进度，以实现断点续传
    //putExtra.resumeRecordFile = 'progress.log';
    var key = null;

    var localFile = "qiniuNew.png";   //测试的本地文件
    // 文件分片上传
    resumeUploader.putFile(uploadToken, key, pathName, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
        res.send(respBody);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
});  

module.exports = router;