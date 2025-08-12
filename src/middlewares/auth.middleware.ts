import type { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config/config.js';

import User from '../models/user.model.js';

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, config.jwtSecret as string);

    const user = await User.findById((decoded as { id: string }).id).select(
      '-password',
    );

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    (req as any).user = user;

    next();
  } catch (error: Error | any) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export default authorize;
