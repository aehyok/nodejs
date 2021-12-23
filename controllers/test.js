const { user } = require('../models/user')
const list = async ctx => {
    console.log('list1', 'ctx')
    const reuslt = ''
    result = await user.find({ isDelete: false })
    console.log(result, ' result')
    ctx.body = result
}


const c = async (ctx, next) => {
    console.log('ccccc', 'ctx')
    const createRes = user.create({
        account: 'aehyok',
        status: 1
    });
    console.log(createRes, 'createRes')
    ctx.body = "插入成功"
}

const todo = async (ctx, next) => {
    console.log('todo1', 'ctx')
    // ctx.throw('请先登录');
    await next()
}

module.exports = {
    list,
    todo,
    c
}