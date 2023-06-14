import SequelizeTeams from '../database/models/SequelizeTeams';
import { Iteams } from '../Interfaces/teams/Iteams';
import { IteamsModel } from '../Interfaces/teams/IteamsModel';

export default class TeamsModel implements IteamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<Iteams[]> {
    const result = await this.model.findAll();
    return result.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: Iteams['id']): Promise<Iteams | null> {
    const result = await this.model.findByPk(id);
    if (result == null) return null;

    const { teamName }: Iteams = result;
    return { id, teamName };
  }
}