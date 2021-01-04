import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import send from 'koa-send';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';

import { mongooseConnection } from './services/db';
import { getClasses, updateClassWeights } from './controllers/class';

export const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyparser());
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

router.patch('/classes/bulk', async (ctx) => {
  await Promise.all(
    ctx.request.body.classes.map((c) => updateClassWeights(c.name, c.weights))
  );

  ctx.status = 200;
});

router.patch('/classes/:class', async (ctx) => {
  await updateClassWeights(ctx.params.class, ctx.request.body.weights);

  ctx.status = 200;
});

router.post('/classes', async (ctx) => {
  console.log('post class', ctx.params.class);
});

router.get('/', async (ctx) => {
  ctx.set('Content-Type', 'text/html');
  await send(ctx, 'dist/src/static/index.html');
});

app.use(serve(__dirname + '/static'));

app.use(router.routes());
