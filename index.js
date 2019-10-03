require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const errorHandler = require('koa-better-error-handler');
const koa404handler = require('koa-404-handler');
const cors = require('koa-cors');
// const session = require('koa-session');
const uuid = require('uuidv4').default;
const router = require('./routers/router');

// Session ID Middleware
const sessions = {};
const sessionMdware = async (ctx, next) => {
  const sid = ctx.cookies.get('sid');
  ctx.session = sid && sessions[sid];
  // eslint-disable-next-line
  ctx.session && console.log('session loaded', ctx.session);
  await next();
  if (ctx.session && !ctx.session.id) {
    ctx.session.id = uuid();
    ctx.cookies.set('sid', ctx.session.id);
    sessions[ctx.session.id] = ctx.session;
  }
};

const app = new Koa();
const PORT = process.env.PORT || 3000;


// override koa's undocumented error hanlder
app.context.onerror = errorHandler;
// specify that is is our api
app.context.api = true;

// middlewares
app
  // .use(session(app))
  .use(logger())
  .use(cors())
  .use(koa404handler)
  .use(bodyParser())
  .use(sessionMdware)
  .use(router.routes());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}🤘`);
});
module.exports = app;
