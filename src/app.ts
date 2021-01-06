import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import send from 'koa-send';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';

import { mongooseConnection } from './services/db';
import { getRecords, createRecord, findRecord } from './controllers/record';

export const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyparser());
app.use(mongooseConnection);

router.get('/records', async (ctx) => {
  try {
    const classes = await getRecords();
    ctx.set('Content-Type', 'application/json');
    ctx.body = JSON.stringify(classes);
  } catch (err) {
    console.log('error while retreiving of classes', err);
  }
});

// router.patch('/classes/bulk', async (ctx) => {
//   await Promise.all(
//     // @ts-ignore
//     ctx.request.body.classes.map((c) => updateClassWeights(c.name, c.weights))
//   );

//   ctx.status = 200;
// });

// router.patch('/classes/:class', async (ctx) => {
//   // @ts-ignore
//   await updateClassWeights(ctx.params.class, ctx.request.body.weights);

//   ctx.status = 200;
// });

router.post('/records', async (ctx) => {
  // @ts-ignore
  console.log('post class', ctx.request.body);
  // @ts-ignore
  const { name, record } = ctx.request.body as { name: string; record: string };

  if (name && Number.isInteger(record)) {
    const existingRecord = await findRecord({
      user: name,
      record: record,
    });
    if (!existingRecord) {
      await createRecord(name, Number.parseInt(record));
    }
    ctx.status = 200;
    return;
  }

  ctx.status = 500;
});

router.get('/', async (ctx) => {
  ctx.set('Content-Type', 'text/html');
  await send(ctx, 'dist/src/static/index.html');
});

app.use(serve(__dirname + '/static'));

app.use(router.routes());
