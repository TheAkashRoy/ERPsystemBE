const {model, Schema} = require("mongoose")

const professorSchema = new Schema({
  empid: Number,
  name: String,
  dept: String,
  ongoingCourses: [
    {
      year: String,
      courseName: String
    }
  ]
}
);


const teacher = model('teacher', professorSchema);

module.exports = teacher;
