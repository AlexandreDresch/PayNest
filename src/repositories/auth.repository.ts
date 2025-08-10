import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

export const UserRepository = {
  async findUserByEmail(email: string) {
    return await mongoose.model('User').findOne({ email });
  },

  async createUser(username: string, email: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create([
      { username, email, password: hashedPassword },
    ]);

    if (!newUsers[0]) {
      throw new Error('User creation failed');
    }

    return newUsers[0];
  },
};
