import { Router } from 'express';
import UserController from '../controllers/UserController';
import validate from '../middlewares/validationUser';
import validateToken from '../middlewares/validationToken';

const userController = new UserController();

const router = Router();

router.post('/', validate, (req, res) => userController.login(req, res));

router.get('/role', validateToken.validateToken, (req, res) => userController.getRole(req, res));

export default router;
