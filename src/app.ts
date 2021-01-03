import Koa from 'koa';
import Router from '@koa/router';

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
router.use((ctx) => {
  console.log('nothing else worked');
  ctx.set('Content-Type', 'application/json');
  ctx.body = JSON.stringify({ shit: 'not shit' });
});

app.use(router.routes());
