import { Request, Response } from 'express';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(SequelizeMatches, SequelizeTeams),
  ) {}

  public getAllTeamsHome = async (req: Request, res: Response) => {
    const response = await this.leaderboardService.getLeaderBoards();
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  };
}
