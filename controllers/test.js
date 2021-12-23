
const list = async ctx => {
    console.log('list1', 'ctx')
    ctx.body = '路由改造后的结果'
}

const todo = async (ctx, next) => {
    console.log('todo1', 'ctx')
    // ctx.throw('请先登录');
    await next()
}

module.exports = {
    list,
    todo
}