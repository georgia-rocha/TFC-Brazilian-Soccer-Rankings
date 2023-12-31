import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

/* router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getAllTeams(req, res),
); */

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getAllTeamsHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getAllTeamsAway(req, res),
);

export default router;
