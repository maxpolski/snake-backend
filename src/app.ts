import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import send from 'koa-send';

import { mongooseConnection } from './services/db';
import { getClasses } from './controllers/class';

export const app = new Koa();
const router = new Router();

app.use(mongooseConnection);

router.get('/classes', async (ctx) => {
  try {
    const classes = await getClasses();
    ctx.set('Content-Type', 'application/json');
    ctx.body = JSON.stringify(classes);
  } catch (err) {
    console.log('error while retreiving of classes', err);
  }
});

router.patch('/classes/:class', async (ctx) => {
  console.log('patch class', ctx.params.class);
});

router.post('/classes', async (ctx) => {
  console.log('post class', ctx.params.class);
});

router.get('/', async (ctx) => {
  console.log('here')
  ctx.set('Content-Type', 'text/html')
  await send(ctx, 'dist/src/static/index.html');
});

app.use(serve(__dirname + '/static'));

app.use(router.routes());
