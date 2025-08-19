import { UserRepository } from '../repositories/user.repository.js';

export const UserService = {
  async getAllUsers() {
    const users = await UserRepository.findAllUsers();

    return users;
  },

  async getUserById(userId: string) {
    const user = await UserRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found!');
    }
    return user;
  },

  async updateUser(userId: string, userData: any) {
    const updatedUser = await UserRepository.updateUser(userId, userData);
    if (!updatedUser) {
      throw new Error('Failed to update user!');
    }
    return updatedUser;
  },

  async deleteUser(userId: string) {
    const user = await UserRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found!');
    }
    await UserRepository.deleteUser(userId);
    return { message: 'User deleted successfully!' };
  },
};
