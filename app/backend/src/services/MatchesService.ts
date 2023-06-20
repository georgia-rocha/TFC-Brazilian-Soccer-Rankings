import { ModelStatic } from 'sequelize';
import { Imatches, INewMatch } from '../Interfaces/matches/Imatches';
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

  public createMatch = async (data: INewMatch) => {
    const { homeTeamId, awayTeamId } = data;

    if (homeTeamId === awayTeamId) {
      return {
        status: 'INVALID_MATCH',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const homeTeam = await SequelizeTeams.findOne({ where: { id: homeTeamId } });
    const awayTeam = await SequelizeTeams.findOne({ where: { id: awayTeamId } });

    if (!homeTeam || !awayTeam) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const match = await this.matchesModel.create({ ...data, inProgress: true });
    return { status: 'CREATED', data: match };
  };
}
