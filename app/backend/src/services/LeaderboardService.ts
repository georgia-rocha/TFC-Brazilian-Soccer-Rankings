import { ModelStatic } from 'sequelize';
import { Iteams } from '../Interfaces/teams/Iteams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import MatchesService from './MatchesService';
import { Ileaderboard } from '../Interfaces/leaderboard/Ileaderboard';

export default class LeaderboardService {
  private matchesService: MatchesService;
  constructor(
    private matchesModel: ModelStatic<SequelizeMatches>,
    private teamsModel: ModelStatic<SequelizeTeams>,
  ) {
    this.matchesService = new MatchesService(this.matchesModel);
  }

  private getTeamName = (teams: Iteams[], homeTeamId: number) =>
    teams.find((team) => team.id === homeTeamId)?.teamName;

  private getTotalGames = (matches: SequelizeMatches[][], team: SequelizeMatches): number => {
    const total = matches.find((game) => game[0].dataValues.homeTeamId === team.id);
    return total ? total.length : 0;
  };

  private getTotalVictories = (matches: SequelizeMatches[][], team: SequelizeMatches) => {
    const homeTeamMatches = matches
      .filter((match) => match[0].dataValues.homeTeamId === team.id)[0];
    return homeTeamMatches
      .filter((match) => match.dataValues.homeTeamGoals > match.dataValues.awayTeamGoals).length;
  };

  private getTotalDraws = (matches: SequelizeMatches[][], team: SequelizeMatches) => {
    const homeTeamMatches = matches
      .filter((match) => match[0].dataValues.homeTeamId === team.id)[0];
    return homeTeamMatches
      .filter((match) => match.dataValues.homeTeamGoals === match.dataValues.awayTeamGoals).length;
  };

  private getTotalLosses = (matches: SequelizeMatches[][], team: SequelizeMatches) => {
    const homeTeamMatches = matches
      .filter((match) => match[0].dataValues.homeTeamId === team.id)[0];
    return homeTeamMatches
      .filter((match) => match.dataValues.homeTeamGoals < match.dataValues.awayTeamGoals).length;
  };

  private getTotalPoints =
  (victories: number, draws: number): number => victories * 3 + draws;

  private getGoalsFavor = (matches: SequelizeMatches[][], team: SequelizeMatches) => {
    const homeTeamMatches = matches
      .filter((match) => match[0].dataValues.homeTeamId === team.id)[0];
    return homeTeamMatches
      .reduce((acc, curr) =>
        acc + curr.dataValues.homeTeamGoals, homeTeamMatches[0]
        .dataValues.homeTeamGoals);
  };

  private getGoalsOwn = (matches: SequelizeMatches[][], team: SequelizeMatches) => {
    const homeTeamMatches = matches
      .filter((match) => match[0].dataValues.homeTeamId === team.id)[0];
    return homeTeamMatches
      .reduce((acc, curr) =>
        acc + curr.dataValues.awayTeamGoals, homeTeamMatches[0]
        .dataValues.awayTeamGoals);
  };

  private getGoals = (mapTeams: SequelizeMatches[][], team: SequelizeMatches) => {
    const goalsFavor = this.getGoalsFavor(mapTeams, team);
    const goalsOwn = this.getGoalsOwn(mapTeams, team);
    const goalsBalance = goalsFavor - goalsOwn;
    return {
      goalsFavor,
      goalsOwn,
      goalsBalance,
    };
  };

  private getEfficiency = (points: number, games: number): number =>
    Number(((points / (games * 3)) * 100).toFixed(2));

  public leaderBoardInfo = (
    mapTeams: SequelizeMatches[][],
    team: SequelizeMatches,
    teams: Iteams[],
  ) => {
    const totalGames = this.getTotalGames(mapTeams, team);
    const totalVictories = this.getTotalVictories(mapTeams, team);
    const totalDraws = this.getTotalDraws(mapTeams, team);
    const totalPoints = this.getTotalPoints(totalVictories, totalDraws);
    return ({
      name: this.getTeamName(teams, team.dataValues.homeTeamId),
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: this.getTotalLosses(mapTeams, team),
      efficiency: this.getEfficiency(totalPoints, totalGames),
      ...this.getGoals(mapTeams, team),
    });
  };

  public getLeaderBoards = async (): Promise<ServiceResponse<Ileaderboard[]>> => {
    const matches = await this.matchesModel.findAll({ where: { inProgress: false } });
    const teams = await this.teamsModel.findAll();

    const mapTeams = teams.map((team) => matches.filter((match) => match.homeTeamId === team.id));

    const leaderboard: Ileaderboard[] = (
      mapTeams.map((team) => this.leaderBoardInfo(mapTeams, team[0], teams)));

    return { status: 'SUCCESSFUL', data: leaderboard };
  };
}
