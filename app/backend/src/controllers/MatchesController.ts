import { Request, Response } from 'express';
// import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/MatchesService';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(SequelizeMatches),
  ) { }

  public getAllMatches = async (req: Request, res: Response) => {
    const response = await this.matchesService.getAllMatches();
    res.status(200).json(response.data);
  };
}
