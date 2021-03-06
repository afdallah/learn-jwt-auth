const chai = require('chai')
const chaiHttp = require('chai-http');
const { should, expect } = chai;

chai.use(chaiHttp);
const server = require('../index');
const User = require('../models/user');

describe('Root Endpoint', () => {
  before(done => {
    User.deleteMany({})
      .then(() => done())
  })

  after(done => {
    User.deleteMany({})
      .then(() => done())
  })

  context('/', () => {
    it('Should return true, and give hello world string in data', done => {
      chai.request(server)
        .get('/')
        .end(function(err, res) {
          expect(res.status).to.eq(200);
          let { status, data } = res.body;

          expect(status).to.eq(true);
          expect(data).to.be.a('string');
          done();
        })
    })
  })
})