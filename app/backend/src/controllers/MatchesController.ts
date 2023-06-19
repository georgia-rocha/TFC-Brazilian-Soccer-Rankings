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
}
