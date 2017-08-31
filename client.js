var net = require('net') ;
var client = net.connect({
    port: 8124
},function(){ // connect监听器
  console.log("客户端已连接") ;
  client.write('Hello,aehyok !\r\n') ;
});
client.on("data", function(data) {
  console.log(data.toString()) ;
  client.end() ;
});
client.on("end", function(){
  console.log("客户端断开连接") ;
}) ;