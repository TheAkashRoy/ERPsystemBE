import { Schema, model } from 'mongoose';

const classRoutineSchema = new Schema({
  day: String,
  dept: String,
  year: String,
  classTime: String,
  professorId: Schema.Types.ObjectId,
});

const classRoutine = model('ClassRoutine', classRoutineSchema);

export default classRoutine;