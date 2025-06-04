import { Request, Response, NextFunction } from 'express';
import jwt, { decode } from 'jsonwebtoken';

// export function verifyToken(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.header('Authorization');
//   const token =
//     authHeader && authHeader.startsWith('Bearer ')
//       ? authHeader.slice(7)
//       : undefined;

//   if (!token) {
//     return res.status(401).json({ error: 'Access Denied' });
//   }

//   try {
//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       return res.status(500).json({ error: 'JWT secret not configured' });
//     }

//     console.log('token', token);
//     // console.log('jwtsecret', jwtSecret);

//     const decoded = jwt.verify(token, jwtSecret);
//     // console.log(decoded);
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// }

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');

  // To use bearer token, use this.
  // const token =
  //   authHeader && authHeader.startsWith('Bearer ')
  //     ? authHeader.slice(7)
  //     : undefined;

  const token = authHeader;

  if (!token) {
    return res.status(401).json({ error: 'Access Denied' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    console.log('token', token);

    const decoded = jwt.verify(token, jwtSecret);
    // console.log('57 decoded', decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');

  const token = authHeader;

  if (!token) {
    return res.status(401).json({ error: 'Access Denied' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    // console.log('token', token);

    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.role != 'seller') {
      console.log('84 decoded', decoded);
      return res.status(401).json({ error: 'You do not have access' });
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
