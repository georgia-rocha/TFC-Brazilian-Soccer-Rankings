// import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!password || !email) {
    return res.status(mapStatusHTTP('INVALID_DATA')).json({ message: 'All fields must be filled' });
  }

  if (password.length < 6) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Invalid email or password' });
  }

  if (!regex.test(email)) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validateUser;
