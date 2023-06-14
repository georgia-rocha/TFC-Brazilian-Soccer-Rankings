import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeMatches from './SequelizeMatches';

class SequelizeTeams extends Model<InferAttributes<SequelizeTeams>,
InferCreationAttributes<SequelizeTeams>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelizeTeams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

SequelizeMatches.belongsTo(SequelizeTeams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatches.belongsTo(SequelizeTeams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeTeams.hasMany(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'homeMatchs' });
SequelizeTeams.hasMany(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'awayMatchs' });

export default SequelizeTeams;
