http://www.cnblogs.com/zhiyishou/p/4711735.html
//bluebird  Promise妙用

//关系嵌套任务
var Promise = require("bluebird"),
readFileAsync = Promise.promisify(require("fs").readFile);

readFileAsync("MrFileOne.txt","utf8")
.then(function(data){
    Promise.reject("It's not correct data!");
    console.log(data+"MrFileOne then  is ok")
    var path ="MrFileTwo.txt";
    return readFileAsync(path,"utf8");
})
.then(function(data){
    console.log(data+"MrFileTwo then  is ok")
    var path = "MrFileThree.txt";
    return readFileAsync(path,"utf8");
})
.then(function(data){
    console.log(data+"MrFileThree then  is ok")
})
.catch(function(err){
    console.log(err);
});


//无关系汇总任务
Promise.all([
    readFileAsync("MrFileOne.txt","utf8"),
    readFileAsync("MrFileTwo.txt","utf8"),
    readFileAsync("MrFileThree.txt","utf8")
])
.then(function(datas){
    console.log(datas+'1+2+3 are ok');
    //do something with three data form our actors
})
.catch(function(err){
    console.log(err);
});