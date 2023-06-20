import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { App } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matches, match2, match1, matchesMock } from './mocks/MatchesMocks';
import { token } from '../tests/mocks/UserMocks';
import SequelizeTeams from '../database/models/SequelizeTeams';
import mapStatusHTTP from '../utils/mapStatusHTTP';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota Matches', () => {
  it('Testa o retorno de getAllMatches',  async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(mapStatusHTTP('SUCCESSFUL'));
    expect(body).to.deep.equal(matches);
  });

  it('Testa o retorno de getAllMatches quando não é encontrado nenhum match',  async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves([] as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(mapStatusHTTP('NOT_FOUND'));
    expect(body.message).to.deep.equal('Not found any matches');
  });

  it('Testa o retorno de getMatchesInProgress',  async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(mapStatusHTTP('SUCCESSFUL'));
    expect(body).to.deep.equal(matchesMock);
  });

  it('Testa o retorno de finishMatch',  async () => {
    sinon.stub(SequelizeMatches, 'update').resolves({} as any);

    const { status, body } = await chai.request(app).patch('/matches/:id/finish').send().set('authorization', token);

    expect(status).to.equal(mapStatusHTTP('SUCCESSFUL'));
    expect(body.message).to.deep.equal('Finished');
  });
  
  it('Testa o retorno de updateMatch',  async () => {
    sinon.stub(SequelizeMatches, 'update').resolves({} as any);

    const { status, body } = await chai.request(app).patch('/matches/:id').send().set('authorization', token);

    expect(status).to.equal(mapStatusHTTP('SUCCESSFUL'));
    expect(body.message).to.deep.equal('Updated Match');
  });

  it('Testa a função createMatch',  async () => {
    sinon.stub(SequelizeMatches, 'create').resolves(match2 as any);
    sinon.stub(SequelizeTeams, 'findOne').resolves({ id: 1, teamName: 'Xablau' } as any);
    sinon.stub(jwt, 'verify').returns({} as any);

    const { status, body } = await chai.request(app).post('/matches/').send(match1).set('authorization', token);

    expect(status).to.equal(mapStatusHTTP('CREATED'));
    expect(body).to.deep.equal(match2);
  });

  afterEach(sinon.restore);
});