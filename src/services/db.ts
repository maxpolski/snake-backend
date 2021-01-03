import { Middleware } from 'koa';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/neural-network');

export const mongooseConnection: Middleware = async (ctx, next) => {
  ctx.mongoose = mongoose.connection;
  next();
};
