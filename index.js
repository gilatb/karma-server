require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const errorHandler = require('koa-better-error-handler');
const koa404handler = require('koa-404-handler');
const cors = require('koa-cors');
const router = require('./routers/router');

const app = new Koa();
const PORT = process.env.PORT || 3000;


// override koa's undocumented error hanlder
app.context.onerror = errorHandler;
// specify that is is our api
app.context.api = true;
console.log('mountedddd');

// middlewares
app
  .use(logger())
  .use(cors())
  .use(koa404handler)
  .use(bodyParser())
  .use(router.routes());

console.log('6465468486');
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}🤘`);
});
