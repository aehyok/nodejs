var express = require('express');
var app = express();
var QRCode = require('qrcode')
var router = express.Router();

app.get('/', function (req, res, next) {
    QRCode.toDataURL('Hello The World', function (err, url) {
      console.log(url);
      //res.send(url);
    })
});

app.listen(3000);