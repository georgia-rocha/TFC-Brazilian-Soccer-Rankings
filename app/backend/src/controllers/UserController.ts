import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  private userService = new UserService();

  public login = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.login(req.body);
      if (response.status !== 'SUCCESSFUL') {
        return res.status(mapStatusHTTP(response.status)).json(response.data);
      }
      return res.status(mapStatusHTTP(response.status)).json({ token: response.data });
    } catch (error) {
      console.log(error, 'error');
      return res.status(500).json('Algo deu errado!');
    }
  };

  public getRole = async (req: Request, res: Response) => {
    const { role } = req.body.user;
    return res.status(200).json({ role });
  };
}
