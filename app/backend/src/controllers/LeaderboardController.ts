// import { Request, Response } from 'express';
import SequelizeMatches from '../database/models/SequelizeMatches';
import MatchesService from '../services/MatchesService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private matcherService = new MatchesService(SequelizeMatches),
  ) {}

/*   public getAllTeamsHome = async (req: Request, res: Response) => {
    const response = await this.matcherService.getAllTeamsHome();
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }; */
}
