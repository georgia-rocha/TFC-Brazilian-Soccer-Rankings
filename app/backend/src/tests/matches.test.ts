import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { App } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matches } from './mocks/MatchesMocks';

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

  afterEach(sinon.restore);
});