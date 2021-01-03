import { Class as ClassModel } from '../models/class';

export const createClass = async (className: string, sizing = 200 * 200) => {
  try {
    const weights = [];
    for (let i = 0; i < sizing; i++) {
      weights.push(Math.random());
    }

    const newClass = new ClassModel({ name: className, weights });

    newClass.save();
  } catch (err) {
    console.log('error while creating a new class', err);
  }
};

export const getClasses = async () => {
  try {
    return ClassModel.find({}).exec();
  } catch (err) {
    console.log('error while retreiving classes', err);
  }
};

export const updateClassWeights = async (
  className: string,
  weights: Array<number>
) => {
  try {
    const classToUpdate = await ClassModel.findOne({ name: className }).exec();

    if (classToUpdate !== null) {
      ClassModel.updateOne(classToUpdate.id, { weights }).exec();
    } else {
      throw new Error(`Such class was not found: "${className}"`);
    }
  } catch (err) {
    console.log('error while updating class weights', err);
  }
};
