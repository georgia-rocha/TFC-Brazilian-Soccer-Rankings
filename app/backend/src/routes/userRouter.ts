import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateUser from '../middlewares/validationUser';
import validateToken from '../middlewares/validationToken';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validateUser,
  userController.login,
);

router.get(
  '/role',
  validateToken.validateToken,
  userController.getRole,
);

export default router;
