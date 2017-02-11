const Koa = require('koa');
const config = require('../config');
const views =  require('koa-views');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const json = require('koa-json');
const logger = require('koa-logger');
const router =  require('koa-router')();
const mongoClient = require('mongodb').MongoClient;

const app = new Koa()
  .use(views(__dirname + '/views', { map: { html: 'jade' }, extension: 'jade' }))
  .use(bodyParser())
  .use(convert(json()))
  .use(convert(logger()))
  .use(async (ctx, next) => {
    ctx.state.db = mongoClient.connect(config.connectionString);
    await next();
  })
  .use(async (ctx, next) => {
    await require('./routes/').routes()(ctx, next)
  })
  .listen(3000, () => console.log('server started 3000'));

