import User from '../models/user.model.js';

export const UserRepository = {
  async findAllUsers() {
    return await User.find({});
  },

  async findUserById(userId: string) {
    return await User.findById(userId).select('-password');
  },
};
