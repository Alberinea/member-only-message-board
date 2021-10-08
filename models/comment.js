import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('comments', commentSchema);

export default Comment