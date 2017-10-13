var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');



var product = require('./models/toBid.js');



//产品list列表 Api
app.get("/list",function(req,res){
    var fdata={"data":"eyJjdXJyZW50UGFnZSI6IjEiLCJwZXJQYWdlIjoiMjAifQ=="}
    var options = {
        method:'post',
        formData:fdata,
        url: 'http://app.guopai365.com/auction/tobid',
        headers: {
          'User-Agent': 'request',
          'Content-Type': ' application/json;charset=utf-8'
        }
      };
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      request(options,function(error, response, body) {
        if (!error && response.statusCode == 200) {
                res.write(body);
                var json=JSON.parse(body);
                var list=json.data.toBid;
                list.forEach(function(element) {
                    product.save(element,errorCallBack);  //写入MongoDB,errorCallBack回调函数
                }, this);
        };
      });
})

function errorCallBack(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('saved OK!');
    }
}


app.get("/qiniu",function(req,res){
    var bucket="aehyok";
    var accessKey = 'TWRriEkY-rhTen4Mn5n88GpYYFwOXR8RecCyJFlp';
    var secretKey = 'IIgxowC3Dx1Mb0Acy4-IchyDC2P_F8PC8on-ENeX';
     key="aehyok.png"; 
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
})


app.get('/', function(req, res) {
    var options = {
        url: 'http://app.guopai365.com/message/scrollinfo',
        headers: {
          'User-Agent': 'request',
          'Content-Type': ' application/json;charset=utf-8'
        }
      };
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  request(options, 
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json =JSON.parse(body);
            var bill=json.data.bill;
            bill.forEach(function(item) {
                var date=new Date();
                date.setTime(item.time*1000);
                //var datetime=date.getYear()+"/"+date.getMonth()+"/"+date.getDay()+" "+date.getHours()+":"+date.getMinutes()+" "+date.getSeconds();
                var str=" " +"NickName:"+item.nickname+"   PName："+item.pname+"</br>";

                res.write(str);
            }, this);
            res.write("</br></br></br>")
            var enroll=json.data.enroll;  
            // enroll.forEach(function(item) {
            //     var str="NickName:"+item.nickname+"   PName："+item.pname+"</br>";
            //     res.write(str);
            // }, this);
        }
    })
});

var server = app.listen(3000, function() {
  console.log('listening at 3000');
});