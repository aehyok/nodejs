const { test } = require('../controllers');

const routes = [
    {
        //  测试
        method: 'get',
        path: '/a',
        controller: [test.list]
    },
    {
        //  测试
        method: 'get',
        path: '/b',
        controller: [test.todo, test.list]
    },
    {
        //  测试
        method: 'get',
        path: '/c',
        controller: [test.list]
    }
];

module.exports = routes;