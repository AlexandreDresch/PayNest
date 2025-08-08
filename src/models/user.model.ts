import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
      minLength: [2, 'Username must be at least 2 characters long.'],
      maxLength: [50, 'Username must not exceed 50 characters.'],
    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'Email already exists.'],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'],
    },
    
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minLength: [6, 'Password must be at least 6 characters long.'],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

export default User;
