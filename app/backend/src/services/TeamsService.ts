import { ModelStatic } from 'sequelize';
import { Iteams } from '../Interfaces/teams/Iteams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class TeamsService {
  constructor(
    private teamsModel: ModelStatic<SequelizeTeams>,
  ) { }

  public getAllTeams = async (): Promise<ServiceResponse<Iteams[]>> => {
    const allTeams = await this.teamsModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  };

  public getTeamById = async (id: number): Promise<ServiceResponse<Iteams>> => {
    const team = await this.teamsModel.findByPk(id);

    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };

    return { status: 'SUCCESSFUL', data: team };
  };
}
