import { Middleware } from 'koa';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

export const mongooseConnection: Middleware = async (ctx, next) => {
  ctx.mongoose = mongoose.connection;
  await next();
};
