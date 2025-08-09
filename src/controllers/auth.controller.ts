import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import type { Request, Response, NextFunction } from 'express';

import User from '../models/user.model.js';
import config from '../config/config.js';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password } = req.body;

    const existingUser = await mongoose
      .model('User')
      .findOne({ email })
      .session(session);

    if (existingUser) {
      return res
        .status(400)
        .send({ title: 'Sign Up', message: 'User already exists!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ username, email, password: hashedPassword }],
      { session },
    );

    if (!newUsers[0]) {
      throw new Error('User creation failed');
    }

    const token = jwt.sign({ id: newUsers[0]._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });

    await session.commitTransaction();
    
    res
      .status(201)
      .json({
        success: true,
        message: 'User created successfully!',
        data: { user: newUsers[0], token },
      });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
