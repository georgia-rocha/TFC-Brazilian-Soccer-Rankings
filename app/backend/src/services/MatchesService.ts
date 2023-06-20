import { ModelStatic } from 'sequelize';
import { Imatches } from '../Interfaces/matches/Imatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchesService {
  constructor(
    private matchesModel: ModelStatic<SequelizeMatches>,
  ) {}

  public getAllMatches = async (): Promise<ServiceResponse<Imatches[]>> => {
    const matches = await this.matchesModel.findAll({
      include: [{
        model: SequelizeTeams,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      }, {
        model: SequelizeTeams,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }],
    });
    if (!matches || matches.length === 0) {
      return { status: 'NOT_FOUND', data: { message: 'Not found any matches' } };
    }
    return { status: 'SUCCESSFUL', data: matches };
  };

  public getMatchesInProgress = async (inProgress: string) => {
    const matches = await this.matchesModel.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [{
        model: SequelizeTeams,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      }, {
        model: SequelizeTeams,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }],
    });
    return { status: 'SUCCESSFUL', data: matches };
  };

  public finishMatch = async (id: number) => {
    const match = await this.matchesModel.update({ inProgress: false }, { where: { id } });
    return { status: 'SUCCESSFUL', data: match };
  };

  public updateMatch = async (homeTeamGoals: number, awayTeamGoals: number, id: number) => {
    const match = await this.matchesModel
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { status: 'SUCCESSFUL', data: match };
  };
}
