import User from '../models/user.model.js';

export const UserRepository = {
  async findAllUsers() {
    return await User.find({});
  },

  async findUserById(userId: string) {
    return await User.findById(userId).select('-password');
  },

  async updateUser(userId: string, userData: any) {
    return await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    }).select('-password');
  },

  async deleteUser(userId: string) {
    return await User.findByIdAndDelete(userId);
  },
};
