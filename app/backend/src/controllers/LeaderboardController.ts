import { Request, Response } from 'express';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import LeaderboardHomeService from '../services/LeaderboardHomeService';
import LeaderboardAwayService from '../services/LeaderboardAwayService';

import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardHomeService = new LeaderboardHomeService(SequelizeMatches, SequelizeTeams),
    private leaderboardAwayService = new LeaderboardAwayService(SequelizeMatches, SequelizeTeams),
  ) {}

  public getAllTeamsHome = async (req: Request, res: Response) => {
    const response = await this.leaderboardHomeService.getLeaderBoardsHome();
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  };

  public getAllTeamsAway = async (req: Request, res: Response) => {
    const response = await this.leaderboardAwayService.getLeaderBoardsAway();
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  };
}
