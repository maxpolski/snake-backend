import Koa from 'koa';
import Router from 'koa-router';
import { mongooseConnection } from './services/db';

export const app = new Koa();
const router = new Router();

app.use(mongooseConnection);

router.get('/classes', (ctx) => {
  // ctx.header['Content-Type'] ='application/json'
  ctx.set('Content-Type', 'application/json');
  ctx.body = '{"shit": 1}';
});

router.patch('/classes/:class', (ctx) => {
  console.log('patch class', ctx.params.class);
});
router.post('/classes', (ctx) => {
  console.log('post class', ctx.params.class);
});

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

app.use(router.routes());
