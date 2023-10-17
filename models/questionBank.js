import { Schema, model } from 'mongoose';

const qbSchema = new Schema({
    subject: String,
        sets: [
            {
                setNo: String,
                questions: [
                    {
                        question: String,
                        options: [String]
                    }
                ]
            }
        ]
}
);


const qb = model('Professor', qbSchema);
export default qb;

