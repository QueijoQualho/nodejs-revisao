import { expect } from "chai";
import supertest from "supertest";
import app from "../../App.js";

describe("Testando as rotas da API de feed", () => {
  let postId;

  it("Deve retornar status 200 e a lista de posts no GET /feed", (done) => {
    supertest(app)
      .get("/feed/")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("Deve retornar status 201 e o post criado no POST /feed/post", (done) => {
    supertest(app)
      .post("/feed/post")
      .field("title", "Qualquer coisa")
      .field("content", "asdasdadas")
      .attach("file", "C:\\Users\\Pedro\\Pictures\\teste.png")
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        postId = res.body._id;

        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("Deve retornar status 200 e post modificado no PATCH /feed/post/:id", (done) => {
    supertest(app)
      .patch(`/feed/post/${postId}`)
      .send({ title: "Nova Título" })
      .expect(200)
      .end(done);
  });

  it("Deve retornar status 200 e deletar o post criado com sucesso no DELETE /feed/post/:id", (done) => {
    supertest(app)
      .delete(`/feed/post/${postId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        supertest(app)
          .get("/feed/")
          .set("Accept", "application/json")
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            expect(res.body.some((post) => post.id === postId)).to.be.false;

            done();
          });
      });
  });

  
});
