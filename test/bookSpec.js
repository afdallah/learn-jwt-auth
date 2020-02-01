const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiLike = require('chai-like');
const chaiThings = require('chai-things');

const { should, expect } = chai;
const faker = require('faker');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
chai.use(chaiThings);
chai.use(chaiLike);

const server = require('../index.js');
const { user } = require('./userSpec');
const User = require('../models/user');
const Book = require('../models/book');

const dummyBook = {
  title: faker.commerce.productName(),
  summary: faker.lorem.sentences(),
  ISBN: Math.floor(Math.random() * 1000000000)
}

describe('/api/v1/books', () => {
  context('Create Book', () => {
    it('Should create a book and restore the created book as an object', done => {
      User.authenticate({ email: user.email, password: user.password })
        .then(token => {
          chai.request(server)
            .post('/api/v1/books')
            .set('Authorization', 'Bearer ' + token)
            .send({...dummyBook, ISBN: faker.random.number(1000000000000000)})
            .end(function (err, res) {
              const { status, data } = res.body;

              expect(res.body.status).to.equal(true)
              expect(status).to.equal(true)
              expect(data).to.be.an('object')
              done()
            })
        })
    })
  })

  context('Get all books', () => {
    it('Should return array of objects', done => {
      User.authenticate({ email: user.email, password: user.password }).then(token => {
        Book.create(dummyBook);
        chai.request(server)
          .get('/api/v1/books')
          .set('Authorization', 'Bearer ' + token)
          .end(function (err, res) {
            const { status, data } = res.body;

            if (err) console.log(err)
            expect(status).to.equal(true);
            expect(res.status).to.equal(200);
            expect(data).have.to.be.an('array')
              .that.contain.a.thing.with.property('ISBN')
            done();
          })
      });
    });
  });
});
