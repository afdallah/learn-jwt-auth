const expect = require('chai').expect
const request = require('supertest');

const app = require('./index');

describe('Users', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});