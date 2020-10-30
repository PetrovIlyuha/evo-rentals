import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [4, 'Username is too short. Min is 4 characters'],
    maxlength: [80, 'Username is too long. Max is 80 characters'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: 'Email is required',
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
  },
  password: {
    type: String,
    requires: 'Password is a required field',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.methods.passwordsMatch = function (passwordGiven) {
  return bcrypt.compareSync(passwordGiven, this.password);
};

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      user.password = hashedPassword;
      next();
    });
  });
});
export const User = mongoose.model('User', userSchema);
