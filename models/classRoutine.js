const {model, Schema} = require("mongoose")
const classRoutineSchema = Schema({
  day: String,
  dept: String,
  year: String,
  classTime: String,
  professorId: Schema.Types.ObjectId,
});

const classRoutine = model('ClassRoutine', classRoutineSchema);
module.exports = classRoutine;
