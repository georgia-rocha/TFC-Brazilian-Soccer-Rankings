import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  private userService = new UserService();

  public login = async (req: Request, res: Response) => {
    const response = await this.userService.login(req.body);
    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    return res.status(mapStatusHTTP(response.status)).json({ token: response.data });
  };

  public getRole = async (req: Request, res: Response) => {
    const { role } = req.body.user;
    return res.status(mapStatusHTTP('SUCCESSFUL')).json({ role });
  };
}
