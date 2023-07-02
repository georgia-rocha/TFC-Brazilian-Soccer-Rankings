import { ModelStatic } from 'sequelize';
// import { Iteams } from '../Interfaces/teams/Iteams';
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

  private getTotalGames = (matches: SequelizeMatches[], team: SequelizeTeams): number => {
    const total = matches.filter((game) => game.dataValues.homeTeamId === team.id);
    return total ? total.length : 0;
  };

  private getResults = (matches: SequelizeMatches[]) => {
    const totalVictories = matches
      .filter((match) =>
        match.homeTeamGoals > match.awayTeamGoals)
      .map((v) => v).length;
    const totalDraws = matches
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    const totalLosses = matches
      .filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    return {
      totalVictories,
      totalDraws,
      totalLosses,
    };
  };

  private getTotalPoints =
  (victories: number, draws: number): number => victories * 3 + draws;

  private getGoalsFavor = (matches: SequelizeMatches[], teamId: number): number => {
    if (teamId === 11) {
      // console.log(mapTeams.map((match) => match));
      console.log(teamId);
      console.log(matches.length);
    }

    let goalsFavor = 0;
    matches.forEach((match) => {
      if (match.awayTeamId === teamId) {
        goalsFavor += match.awayTeamGoals;
      } else if (match.homeTeamId === teamId) {
        goalsFavor += match.homeTeamGoals;
      }
    });
    return goalsFavor;
  };

  private getGoalsOwn = (matches: SequelizeMatches[], teamId: number): number => {
    let goalsOwn = 0;
    matches.forEach((match) => {
      if (match.awayTeamId === teamId) {
        goalsOwn += match.homeTeamGoals;
      } else if (match.homeTeamId === teamId) {
        goalsOwn += match.awayTeamGoals;
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
    team: SequelizeTeams,
    matches: SequelizeMatches[],
  ) => {
    const totalGames = this.getTotalGames(matches, team);
    console.log(`${team.teamName} :`, matches.length);
    const { totalDraws, totalVictories } = this.getResults(matches);
    const totalPoints = this.getTotalPoints(totalVictories, totalDraws);
    return ({
      name: team.teamName,
      totalPoints,
      totalGames,
      ...this.getResults(matches),
      ...this.getGoals(matches, team.id),
      efficiency: this.getEfficiency(totalPoints, totalGames),
    });
  };

  public getLeaderBoards = async (): Promise<ServiceResponse<Ileaderboard[]>> => {
    const matches = (await this.matchesModel.findAll({ where: { inProgress: false } }));
    const teams = await this.teamsModel.findAll();

    const mapTeams = teams.map((team) => matches.filter((match) => match.homeTeamId === team.id));
    console.log(mapTeams[11].length);
    const leaderboard: Ileaderboard[] = (
      teams.map((team) => this.leaderBoardInfo(team, mapTeams[team.dataValues.id - 1])))
      .sort((a, b) =>
        b.totalPoints - a.totalPoints
          || b.totalVictories - a.totalVictories
          || b.goalsBalance - a.goalsBalance
          || b.goalsFavor - a.goalsFavor);

    return { status: 'SUCCESSFUL', data: leaderboard };
  };

  public getAllTeamsAway = async () => {
    const matches = (await this.matchesModel.findAll({ where: { inProgress: false } }));
    const teams = await this.teamsModel.findAll();
    const mapTeams = teams.map((team) => matches.filter((match) => match.homeTeamId === team.id));

    return { status: 'SUCCESSFUL', data: mapTeams };
  };
}
