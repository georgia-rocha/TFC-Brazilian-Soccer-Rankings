import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  private userService = new UserService();

  public login = async (req: Request, res: Response) => {
    try {
      const serviceResponse = await this.userService.login(req.body);
      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
      }
      return res.status(200).json({ token: serviceResponse.data });
    } catch (error) {
      console.log(error, 'error');
      return res.status(500).json('Algo deu errado!');
    }
  };
}
