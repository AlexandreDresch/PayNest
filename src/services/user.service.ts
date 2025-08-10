import { UserRepository } from '../repositories/user.repository.js';

export const UserService = {
  async getAllUsers() {
    const users = UserRepository.findAllUsers();

    return users;
  },

  async getUserById(userId: string) {
    const user = await UserRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found!');
    }
    return user;
  },
};
