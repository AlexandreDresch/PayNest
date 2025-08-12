import type { Request, Response, NextFunction } from 'express';
import type { ArcjetNodeRequest } from '@arcjet/node';

import aj from '../config/arcjet.js';

type ArcjetExpressRequest = Request & Partial<ArcjetNodeRequest>;

const arcjetMiddleware = async (
  req: ArcjetExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const decision = await aj.protect(req as ArcjetNodeRequest, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({ error: 'Access denied for bots' });
      }

      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.error('Arcjet middleware error:', error);
    next(error);
  }
};

export default arcjetMiddleware;