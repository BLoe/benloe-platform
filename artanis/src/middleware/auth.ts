import { Request, Response, NextFunction } from 'express';

import { authService } from '../services/auth';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string | null;
        avatar: string | null;
        timezone: string;
        createdAt: Date;
        lastLoginAt: Date | null;
      };
    }
  }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const decoded = await authService.verifyJWT(token);
    const user = await authService.getUserById(decoded.userId);

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch {
    res.clearCookie('token');
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  authService
    .verifyJWT(token)
    .then(async (decoded) => {
      const user = await authService.getUserById(decoded.userId);
      if (user) {
        req.user = user;
      }
      next();
    })
    .catch(() => {
      res.clearCookie('token');
      next();
    });
}
