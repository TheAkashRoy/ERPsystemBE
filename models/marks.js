import { ObjectId } from 'mongoose';
import { Schema, model } from 'mongoose';

const scoreSchema = new Schema({
  prof: ObjectId,
  date: Date,
  year: String,
  questionSetNo: String,
  scores: {
    enrollment: Number 
  }
}

);


const score = model('Professor', scoreSchema);

export default score;
