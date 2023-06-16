import * as jwt from 'jsonwebtoken';
import { Iusers } from '../Interfaces/users/Iusers';

const secret = process.env.JWT_SECRET || 'secret';

export default class Auth {
  public generateToken = (payload: { email: string, role : string }): string => {
    const token = jwt.sign(payload, secret, { expiresIn: '30D' });
    return token;
  };

  public verify = (token: string): Iusers => {
    const data = jwt.verify(token, secret) as Iusers;
    return data;
  };
}
