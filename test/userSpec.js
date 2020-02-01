const chai = require('chai');
const chaiLike = require('chai-like');
const chaiThings = require('chai-things');
const chaiHttp = require('chai-http');
const { should, expect } = chai;
const faker = require('faker');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
// chai.use(chaiLike);
// chai.use(chaiThings);

const server = require('../index.js');
const User = require('../models/user');

const user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('/api/v1/users', () => {
  context('Register', () => {
    it('Should create new user', done => {
      chai
        .request(server)
        .post('/api/v1/users')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(user))
        .end(function(err, res) {
          let { status, data } = res.body;

          expect(res.status).to.eq(200);
          expect(status).to.eq(true);
          expect(data).to.be.an('object');
          expect(data).to.have.property('_id');
          expect(data.email).to.eq(user.email);
          done();
        });
    });
  });

  context('Login', () => {
    it('Should return generated token', done => {
      User.authenticate({ email: user.email, password: user.password }).then(token => {
        expect(token).to.be.a('string');
      });
      done();
    });
  });

  context('Get all users', () => {
    it('Should return users array', done => {
      User.authenticate({ email: user.email, password: user.password }).then(token => {
        chai
          .request(server)
          .get('/api/v1/users/')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .end(function(err, res) {
            let { status, data } = res.body;

            expect(res.status).to.eq(200);
            expect(status).to.eq(true);

            data = data.map(item => {
              return {
                email: item.email,
                password: item.password,
              };
            });

            expect(status).to.eq(true);
            expect(data)
              .to.be.an('array')
              .that.contains.something.to.have.all.keys({ email: 'bla', password: 'tst' });
            done();
          });
      });
    });
  });

  context('Update user by id', () => {
    it("Should return an updated user's object", done => {
      User.authenticate({ email: user.email, password: user.password }).then(token => {
        chai
          .request(server)
          .put('/api/v1/users')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .send({ email: user.email, name: user.name })
          .end(function(err, res) {
            const { status, data } = res.body;

            expect(status).to.equal(true);
            expect(data).to.be.an('object');
            expect(data).to.have.property('name', user.name)
            expect(data).to.have.property('email', user.email)
            done();
          });
      });
    });
  });
});

module.exports = {
  user
}