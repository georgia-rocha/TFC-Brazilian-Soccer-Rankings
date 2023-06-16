import { Iusers } from './Iusers';

export interface IuserModel {
  findUserByEmail(email: string): Promise<Iusers | null>,
}
