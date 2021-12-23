
const { bunyan } = require('koa-bunyan-logger');
const mongoose = require('mongoose');

const logger = bunyan.createLogger({
    name: 'mongodb',
    level: 1
});
// 连接类型，1使用连接字符串，其他的通过配置项方式
const MONGO_DB_NODES = "mongodb://139.186.205.7:27017/aehyok"
if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}
mongoose.Promise = Promise;
const mongoConnectionType = '0'
if (mongoConnectionType === '1') {
    mongoose.connect(MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} else {
    mongoose.connect(`mongodb://${MONGO_DB_NODES}`, {
        dbName: 'aehyok',
        user: 'admin',
        pass: '123456',
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

mongoose.connection.once('openUri', logger.info.bind(logger, 'mongodb connected'));
mongoose.connection.on('error', logger.error.bind(logger));
mongoose.connection.on('error', (err) => {
    console.log('Mongoose error:', err);
    process.nextTick(process.exit, 1);
});

mongoose.connection.on('reconnected', () => {
    console.log('Mongoose reconnected');
});

mongoose.connection.on('close', () => {
    console.log('Mongoose close');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
});
