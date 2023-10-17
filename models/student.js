import { ObjectId } from 'mongoose';
import { Schema, model } from 'mongoose';

const studentSchema =  Mongoose.Schema({
    _id: ObjectId,
    name: String,
    dept: String,
    year: String,
    enrollmentNo: String
  }
);


const student = model('Professor', studentSchema);

export default student;
