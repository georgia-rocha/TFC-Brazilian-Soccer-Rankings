import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { App } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { team, teams } from './mocks/TeamsMocks';
import mapStatusHTTP from '../utils/mapStatusHTTP';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota Teams', () => {
  it('Testa o retorno de getAllTeams',  async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Testa o retorno da função getTeamById', async () => {
    sinon.stub(SequelizeTeams, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(mapStatusHTTP('SUCCESSFUL'));
    expect(body).to.deep.equal(team);
  });

  it('Testa se for passado um id inexistente na função getTeamById', async () => {
    sinon.stub(SequelizeTeams, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(mapStatusHTTP('NOT_FOUND'));
    expect(body.message).to.equal('Team 1 not found');
  });

  afterEach(sinon.restore);
});