import { Schema, model } from 'mongoose';

const classSchema = new Schema({
  name: String,
  weights: [Number],
});

export const Class = model('class', classSchema);
