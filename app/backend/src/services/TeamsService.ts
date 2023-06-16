import { IteamsModel } from '../Interfaces/teams/IteamsModel';
import { Iteams } from '../Interfaces/teams/Iteams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teamsModel: IteamsModel,
  ) { }

  public getAllTeams = async (): Promise<ServiceResponse<Iteams[]>> => {
    const allTeams = await this.teamsModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  };

  public getTeamById = async (id: number): Promise<ServiceResponse<Iteams>> => {
    const team = await this.teamsModel.findById(id);

    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };

    return { status: 'SUCCESSFUL', data: team };
  };
}
