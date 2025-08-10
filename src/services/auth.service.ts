import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../config/config.js';

import { UserRepository } from '../repositories/auth.repository.js';

export const AuthService = {
  async signUp(username: string, email: string, password: string) {
    if (!username || !email || !password) {
      throw new Error('All fields are required!');
    }

    const existingUser = await UserRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error('User already exists!');
    }

    const newUser = await UserRepository.createUser(username, email, password);

    const token = jwt.sign({ id: newUser._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });

    return { user: newUser, token };
  },

  async authenticateUser(email: string, password: string) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    return { user: userWithoutPassword, token };
  },

  async findUserByEmail(email: string) {
    return await UserRepository.findUserByEmail(email);
  },
};
