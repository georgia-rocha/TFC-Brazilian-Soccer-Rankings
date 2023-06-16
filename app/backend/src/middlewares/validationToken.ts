import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const secret = process.env.JWT_SECRET;

function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(token, secret as string);

    next();
  } catch (error) {
    console.log(error);
    return res.status(mapStatusHTTP('UNAUTHORIZED'))
      .json({ message: 'Token must be a valid token' });
  }
}

export default {
  validateToken,
};
