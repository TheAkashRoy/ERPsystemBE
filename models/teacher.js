import { Schema, model } from 'mongoose';

const professorSchema = new Schema({
  _id: ObjectId,
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


const teacher = model('Professor', professorSchema);

export default teacher;
