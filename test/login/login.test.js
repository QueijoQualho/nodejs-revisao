import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../App.js'; 

describe('Testando funções de autenticação', () => {
  describe('POST /auth/singup', () => {
    it('Deve cadastrar um novo usuário com sucesso', (done) => {
      const newUser = {
        name: 'seilaaaa',
        email: 'novo.usuario@example.com',
        password: 'senha123',
      };

      supertest(app)
        .post('/auth/singup')
        .send(newUser)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('name', newUser.name);
          expect(res.body).to.have.property('email', newUser.email);

          done();
        });
    });

  });

  describe('POST /auth/login', () => {
    it('Deve realizar o login com sucesso', (done) => {
      const credentials = {
        email: 'novo.usuario@example.com',
        password: 'senha123',
      };

      supertest(app)
        .post('/auth/login')
        .send(credentials)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('email', credentials.email);

          done();
        });
    });

  });
});
