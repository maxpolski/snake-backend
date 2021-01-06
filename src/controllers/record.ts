import { Record as RecordModel } from '../models/record';

export const createRecord = async (userName: string, record: number) => {
  try {
    const newRecord = new RecordModel({ user: userName, record });

    newRecord.save();
  } catch (err) {
    console.log('error while creating a new record', err);
  }
};

export const getRecords = async () => {
  try {
    return RecordModel.find({}).exec();
  } catch (err) {
    console.log('error while retreiving classes', err);
  }
};

export const findRecord = params => RecordModel.findOne(params).exec();

// export const updateClassWeights = async (
//   className: string,
//   weights: Array<number>
// ) => {
//   try {
//     const classToUpdate = await ClassModel.findOne({ name: className }).exec();

//     if (classToUpdate !== null) {
//       ClassModel.updateOne(classToUpdate.id, { weights }).exec();
//     } else {
//       throw new Error(`Such class was not found: "${className}"`);
//     }
//   } catch (err) {
//     console.log('error while updating class weights', err);
//   }
// };
