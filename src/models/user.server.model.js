import MONGOOSE, { Schema } from 'mongoose';
import _ from 'lodash';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true
  },
);

userSchema.methods.toJSON = function() { // eslint-disable-line
  return _.pick(this, ['name']);
};

export default MONGOOSE.model('User', userSchema);
