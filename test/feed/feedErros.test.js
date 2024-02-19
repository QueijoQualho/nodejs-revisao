import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../App.js';

function assertError(res, expectedMsg) {
    expect(res.body).to.have.property('error', true);
    expect(res.body).to.have.property('errors');

    const errorWithMsg = res.body.errors.find(error => error.msg === expectedMsg);
    expect(errorWithMsg).to.exist;
}

describe("Testando erros da API de feed", () => {

    describe('Testando a função POST', () => {
        it('Deve retornar status 422 se o campo "title" estiver ausente no POST /feed/post', (done) => {
            supertest(app)
                .post('/feed/post')
                .field('content', 'asdasdadas')
                .attach('file', 'C:\\Users\\Pedro\\Pictures\\teste.png')
                .expect(422)
                .end((err, res) => {
                    if (err) return done(err);
    
                    assertError(res, 'Invalid value for title!');
    
                    done(); 
                });
        });
    
        it('Deve retornar status 422 se o campo "content" estiver ausente no POST /feed/post', (done) => {
            supertest(app)
                .post('/feed/post')
                .field('title', 'Qualquer coisa')
                .attach('file', 'C:\\Users\\Pedro\\Pictures\\teste.png')
                .expect(422)
                .end((err, res) => {
                    if (err) return done(err);
    
                    assertError(res, 'Invalid value for content!');
    
                    done();
                });
        });
    
        it('Deve retornar status 422 se o campo "title" estiver menos de 5 caracteres no POST /feed/post', (done) => {
            supertest(app)
                .post('/feed/post')
                .field('title', 'aa')
                .attach('file', 'C:\\Users\\Pedro\\Pictures\\teste.png')
                .expect(422)
                .end((err, res) => {
                    if (err) return done(err);
    
                    assertError(res, 'Invalid value for title!');
    
                    done(); 
                });
        });
    
        it('Deve retornar status 422 se o campo "content" estiver menos de 5 caracteres no POST /feed/post', (done) => {
            supertest(app)
                .post('/feed/post')
                .field('content', 'aa')
                .attach('file', 'C:\\Users\\Pedro\\Pictures\\teste.png')
                .expect(422)
                .end((err, res) => {
                    if (err) return done(err);
    
                    assertError(res, 'Invalid value for content!');
    
                    done(); 
                });
        });
    
        it('Deve retornar status 422 se todos os campos estiverem ausentes no POST /feed/post', (done) => {
            supertest(app)
                .post('/feed/post')
                .expect(422)
                .end((err, res) => {
                    if (err) return done(err);
    
                    expect(res.body).to.have.property('error', true);
                    expect(res.body).to.have.property('errors');            
    
                    done(); 
                });
        });
    
    })


    describe('Testando a função DELETE', () => {
        it("Deve retornar status 404 se não colocar o id do post no DELETE /feed/post/:id", (done) => {
            supertest(app)
              .delete(`/feed/post/65d023abeedbe1bea464ab0b`)
              .expect(404)
              .end((err, res) => {
                if (err) return done(err);
        
                done()
              });
        });
    })

    describe('Testando a função PATCH', () => {
        it('Deve retornar status 404 se não colocar o id do post no PATCH /feed/post/:id', (done) => {
            const postIdInexistente = '65d023abeedbe1bea464ab0d';
    
            supertest(app)
                .patch(`/feed/post/${postIdInexistente}`)
                .field('title', 'Novo Título')
                .field('content', 'Novo Conteúdo')
                .attach('file', 'C:\\Users\\Pedro\\Pictures\\teste.png')
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
    
                    expect(res.body).to.have.property('error', true);
    
                    done();
                });
        });
    

    });
});
