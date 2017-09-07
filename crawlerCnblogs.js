// 一些依赖库
var http = require("http"),
url = require("url"),
superagent = require("superagent"),    //处理请求模块 get,post,put,delete,head
cheerio = require("cheerio"),          //处理抓取的网页数据
async = require("async"),
eventproxy = require('eventproxy');

var ep = new eventproxy(),
urlsArray = [], //存放爬取网址
pageUrls = [],  //存放收集文章页面网站(200个页面)
pageNum = 200,  //要爬取文章的页数
titlesArray=[];

//200个页面地址
for(var i=1 ; i<= 2 ; i++){
    pageUrls.push('http://www.cnblogs.com/?CategoryId=808&CategoryType=%22SiteHome%22&ItemListActionName=%22PostList%22&PageIndex='+ i +'&ParentCategoryId=0');
}

function start(){
    function onRequest(req, res){
        console.log("1————————Debugger");

        ep.after('blogtitle',2*2,function(title){
            titlesArray.forEach(function(item){
                res.write(item+"</br>");
            });
        });      

        ep.after('BlogArticleHtml',2*2,function(articleUrls){
            // 当所有 'BlogArticleHtml' 事件完成后的回调触发下面事件
            res.write("BlogArticleHtml"+"</br>");
            res.write("Blog++++</br>"+urlsArray.length.toString());
            urlsArray.forEach(function(str) {
                res.write(str+"</br>");
            }, this);

            urlsArray.forEach(function(item) {
                superagent.get(item).end(function(err,pres){
                    if (err) {
                        console.log(err);
                        return;
                    }
                    var $ = cheerio.load(pres.text);
                    var title=$('title').text();
                    titlesArray.push(title);
                    ep.emit('blogtitle', title);
                })
                
            }, this);
           });

		// 设置字符编码(去掉中文会乱码)
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        pageUrls.forEach(function(pageUrl){
            superagent.get(pageUrl)
                .end(function(err,pres){
                        //常规的错误处理
                        res.write(pageUrl);
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // pres.text 里面存储着请求返回的 html 内容，将它传给 cheerio.load 之后
                    // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
                    // 剩下就都是 jquery 的内容了
                    var $ = cheerio.load(pres.text);
                    var curPageUrls = $('.titlelnk');

                    for(var i = 0 ; i < curPageUrls.length ; i++){
                        var articleUrl = curPageUrls.eq(i).attr('href');
                        urlsArray.push(articleUrl);
                        //res.write(articleUrl+"</br>");
                        console.log(articleUrl);
                        // 相当于一个计数器
                        ep.emit('BlogArticleHtml', articleUrl);
                    }
                });
        })
      }
      http.createServer(onRequest).listen(3001);  
}

exports.start= start;