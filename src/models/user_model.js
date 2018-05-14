import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.pre('save', function beforeModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;
  if (!user.isModified('password')) return next();

  const myPlaintextPassword = user.password;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, res) => {
    if (res === true) {
      return callback(null, true);
    } else {
      return callback(err);
    }
  });
};


const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
