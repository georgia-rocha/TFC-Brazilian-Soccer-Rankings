import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const secret = process.env.JWT_SECRET;

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
  }

  try {
    const verifyToken = jwt.verify(token, secret as string);
    req.body.user = verifyToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(mapStatusHTTP('UNAUTHORIZED'))
      .json({ message: 'Token must be a valid token' });
  }
};

export default {
  validateToken,
};
