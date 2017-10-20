//https://github.com/koajs/koa
//http://www.jianshu.com/p/dcdd116600fe
//http://koa.bootcss.com/

const Koa = require('koa');
const app = new Koa();

const convert = require('koa-convert');

//中间件记录日志
app.use(convert(function *(next) {
  const start = Date.now();
  yield next;
  const ms = Date.now() - start;
  console.log(`${this.method} ${this.url} - ${ms}ms`);
}));

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

//错误处理
app.on('error', function(err){
    console.log('server error');
  });
app.on('error', function(err, ctx){
    console.log('server error');
 });



app.listen(3000);