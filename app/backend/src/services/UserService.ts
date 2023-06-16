import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import User from '../database/models/SequelizeUsers';
import { Iusers } from '../Interfaces/users/Iusers';
import Auth from '../utils/jwt';

export default class UserService {
  private token = new Auth();

  public login = async (user: Iusers): Promise<ServiceResponse<string>> => {
    const { email, password } = user;

    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const valid = await bcrypt.compare(password, foundUser.password);

    if (!valid) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const token = this.token.generateToken({ email, role: foundUser.role });

    return { status: 'SUCCESSFUL', data: token };
  };
}
