import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import validate from '../middlewares/validationToken';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.getMatchesInProgress(req, res),
);

router.patch(
  '/:id/finish',
  validate.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.patch(
  '/:id',
  validate.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

router.post(
  '/',
  validate.validateToken,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
