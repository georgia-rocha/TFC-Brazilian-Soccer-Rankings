import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import validate from '../middlewares/validationUser';
import validateToken from '../middlewares/validationToken';

const userController = new UserController();

const router = Router();

router.post('/', validate, (req: Request, res: Response) => userController.login(req, res));

router.get(
  '/role',
  validateToken.validateToken,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default router;
