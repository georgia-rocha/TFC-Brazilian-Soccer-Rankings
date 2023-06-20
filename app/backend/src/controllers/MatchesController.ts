import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
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
      return res.status(mapStatusHTTP(response.status)).json(response?.data);
    }
    const response = await this.matchesService.getAllMatches();
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await this.matchesService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(response.status)).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchesService
      .updateMatch(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
    return res.status(mapStatusHTTP(response.status)).json({ message: 'Updated Match' });
  };

  public createMatch = async (req: Request, res: Response) => {
    const { body } = req;
    const response = await this.matchesService.createMatch(body);
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  };
}
