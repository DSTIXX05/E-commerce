import { Request, Response, NextFunction } from 'express';
import jwt, { decode } from 'jsonwebtoken';

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.header('Authorization');
  const token =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

  if (!token) {
    res.status(401).json({ error: 'Access Denied' });
    return;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: 'JWT secret not configured' });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret);
    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'userId' in decoded &&
      'role' in decoded
    ) {
      req.userId = (decoded as any).userId;
      req.role = (decoded as any).role;
      next();
    } else {
      res.status(401).json({ error: 'Invalid token payload' });
    }
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function verifySeller(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const role = req.role;
  if (role != 'seller') {
    res.status(403).json({ error: 'Access Denied: Seller only' });
    return;
  }
  next();
}
