import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamsService from '../services/TeamsService';
import ModelTeams from '../model/TeamsModel';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(new ModelTeams()),
  ) { }

  public getAllTeams = async (_req: Request, res: Response) => {
    const response = await this.teamsService.getAllTeams();
    res.status(mapStatusHTTP(response.status)).json(response.data);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await this.teamsService.getTeamById(Number(id));

    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    res.status(mapStatusHTTP(response.status)).json(response.data);
  };
}
