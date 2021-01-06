import { Schema, model } from 'mongoose';

const recordSchema = new Schema({
  user: String,
  record: Number,
});

export const Record = model('record', recordSchema);
