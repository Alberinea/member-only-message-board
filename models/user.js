import mongoose from 'mongoose';
import uniqueValidators from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

userSchema.plugin(uniqueValidators);
const User = mongoose.model('users', userSchema);

export default User;
