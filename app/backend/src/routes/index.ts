import { Router } from 'express';
import teamsRouter from './teamsRouter';
import loginRouter from './userRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);

export default router;
