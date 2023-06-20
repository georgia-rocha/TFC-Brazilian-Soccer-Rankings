import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { App } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matches } from './mocks/MatchesMocks';
import { token } from '../tests/mocks/UserMocks';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota Matches', () => {
  it('Testa o retorno de getAllMatches',  async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Testa o retorno de finishMatch',  async () => {
    sinon.stub(SequelizeMatches, 'update').resolves({} as any);

    const { status, body } = await chai.request(app).patch('/matches/:id/finish').send().set('authorization', token);

    expect(status).to.equal(200);
    expect(body.message).to.deep.equal('Finished');
  });
  
  it('Testa o retorno de updateMatch',  async () => {
    sinon.stub(SequelizeMatches, 'update').resolves({} as any);

    const { status, body } = await chai.request(app).patch('/matches/:id').send().set('authorization', token);

    expect(status).to.equal(200);
    expect(body.message).to.deep.equal('Updated Match');
  });

  afterEach(sinon.restore);
});