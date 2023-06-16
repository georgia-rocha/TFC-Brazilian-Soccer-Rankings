import { Router } from 'express';
import teamsRouter from './teamsRouter';
import loginRouter from './userRouter';
import matchesRouter from './matchesRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);

export default router;
