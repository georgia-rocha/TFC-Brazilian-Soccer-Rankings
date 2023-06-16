import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { App } from '../app';
import { login, loginOnlyEmail, loginOnlyPassword, loginIncorrect, token } from './mocks/UserMocks';
import mapStatusHTTP from '../utils/mapStatusHTTP';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const secret = process.env.JWT_SECRET || 'secret';

describe('Testa a rota Login', function () {
  it('Testa o retorno do login', async function() {
    const response = await chai.request(app).post('/login').send(login);

    expect(response.status).to.equal(mapStatusHTTP('SUCCESSFUL'));
    expect(!!jwt.verify(response.body.token, secret)).to.be.equal(true);
  });

  it('Testa o retorno do login caso não seja passado um email', async function() {
    const response = await chai.request(app).post('/login').send(loginOnlyPassword);

    expect(response.status).to.equal(mapStatusHTTP('INVALID_DATA'));
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled'});
  });

  it('Testa o retorno do login caso não seja passado um password', async function() {
    const response = await chai.request(app).post('/login').send(loginOnlyEmail);

    expect(response.status).to.equal(mapStatusHTTP('INVALID_DATA'));
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled'});
  });

  it('Testa o retorno, ao passar email errado', async function() {
    const response = await chai.request(app).post('/login').send(loginIncorrect);

    expect(response.status).to.be.equal(mapStatusHTTP('UNAUTHORIZED'));
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testa se retorna o role do usuário com o token válido', async function() {
    const response = await chai.request(app).get('/login/role').set('authorization', token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('role');
    expect(response.body.role).to.have.equal('user');
  });

  afterEach(sinon.restore);
});
