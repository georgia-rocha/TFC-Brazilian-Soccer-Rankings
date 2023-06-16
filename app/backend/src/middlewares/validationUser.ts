// import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default function validateUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  const regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!password || !email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (regex.test(email) === false) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
}
