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

  private getResults = (matches: SequelizeMatches[][], team: SequelizeMatches) => {
    const homeTeamMatches = matches
      .filter((match) => match[0].dataValues.homeTeamId === team.id)[0];
    const totalVictories = homeTeamMatches
      .filter((match) =>
        match.dataValues.homeTeamGoals > match.dataValues.awayTeamGoals
        || match.dataValues.awayTeamGoals > match.dataValues.homeTeamGoals)
      .map((v) => v.dataValues).length;
    const totalDraws = homeTeamMatches
      .filter((match) => match.dataValues.homeTeamGoals === match.dataValues.awayTeamGoals).length;
    const totalLosses = homeTeamMatches
      .filter((match) => match.dataValues.homeTeamGoals < match.dataValues.awayTeamGoals).length;
    return {
      totalVictories,
      totalDraws,
      totalLosses,
    };
  };

  private getTotalPoints =
  (victories: number, draws: number): number => victories * 3 + draws;

  private getGoalsFavor = (matches: SequelizeMatches[], teamId: number): number => {
    let goalsFavor = 0;
    matches.forEach((match) => {
      if (match.dataValues.awayTeamId === teamId) {
        goalsFavor += match.dataValues.awayTeamGoals;
      } else if (match.dataValues.homeTeamId === teamId) {
        goalsFavor += match.dataValues.homeTeamGoals;
      }
    });
    return goalsFavor;
  };

  private getGoalsOwn = (matches: SequelizeMatches[], teamId: number): number => {
    let goalsOwn = 0;
    matches.forEach((match) => {
      if (match.dataValues.awayTeamId === teamId) {
        goalsOwn += match.dataValues.homeTeamGoals;
      } else if (match.dataValues.homeTeamId === teamId) {
        goalsOwn += match.dataValues.awayTeamGoals;
      }
    });
    return goalsOwn;
  };

  private getGoals = (matches: SequelizeMatches[], teamId: number) => {
    const goalsFavor = this.getGoalsFavor(matches, teamId);
    const goalsOwn = this.getGoalsOwn(matches, teamId);
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
    matches: SequelizeMatches[],
  ) => {
    const totalGames = this.getTotalGames(mapTeams, team);
    const { totalDraws, totalVictories } = this.getResults(mapTeams, team);
    const totalPoints = this.getTotalPoints(totalVictories, totalDraws);
    return ({
      name: this.getTeamName(teams, team.dataValues.homeTeamId),
      totalPoints,
      totalGames,
      ...this.getResults(mapTeams, team),
      ...this.getGoals(matches, team.dataValues.id),
      efficiency: this.getEfficiency(totalPoints, totalGames),
    });
  };

  public getLeaderBoards = async (): Promise<ServiceResponse<Ileaderboard[]>> => {
    const matches = (await this.matchesModel.findAll({ where: { inProgress: false } }));
    const teams = await this.teamsModel.findAll();

    const mapTeams = teams.map((team) => matches.filter((match) => match.homeTeamId === team.id));
    const leaderboard: Ileaderboard[] = (
      mapTeams.map((team) => this.leaderBoardInfo(mapTeams, team[0], teams, matches)))
      .sort((a, b) =>
        b.totalPoints - a.totalPoints
          || b.totalVictories - a.totalVictories
          || b.goalsBalance - a.goalsBalance
          || b.goalsFavor - a.goalsFavor);

    return { status: 'SUCCESSFUL', data: leaderboard };
  };
}
