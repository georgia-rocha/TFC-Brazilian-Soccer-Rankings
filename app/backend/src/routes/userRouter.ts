import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateUser from '../middlewares/validationUser';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validateUser,
  userController.login,
);

export default router;
