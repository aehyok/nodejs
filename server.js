var net = require('net') ;
var server = net.createServer(function(c) { // Connection监听器
  console.log("服务器已连接") ;
  c.on("end", function() {
    console.log("服务器已断开") ;
  }) ;
  c.write("Hello,aehyok !\r\n") ;
  c.pipe(c) ;
}) ;
server.listen(8124, function() { // Listening监听器
  console.log("服务器已绑定") ;
}) ;