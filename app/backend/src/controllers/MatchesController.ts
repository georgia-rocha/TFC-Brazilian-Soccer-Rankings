import { Request, Response } from 'express';
// import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/MatchesService';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(SequelizeMatches),
  ) { }

  public getMatchesInProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const response = await this.matchesService.getMatchesInProgress(String(inProgress));
      return res.status(200).json(response?.data);
    }
    const response = await this.matchesService.getAllMatches();
    return res.status(200).json(response.data);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService
      .updateMatch(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
    return res.status(200).json({ message: 'Updated Match' });
  };
}
