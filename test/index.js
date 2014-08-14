var HTTPError = require('../');
var http = require('http');

describe('HTTPError', function() {
  it('should be throwable', function() {
    (function() {
      throw new HTTPError(404, 'Not found')
    }).should.throw();
  });

  it('should be an instance of Error', function() {
    var err = new HTTPError(404, 'Not found!');
    err.should.be.instanceOf(Error);
  });

  it('should be safe without the new operator', function() {
    var err = HTTPError(400, 'test');
    (err instanceof HTTPError).should.be.true;
    err.message.should.eql('test');
    err.code.should.eql(400);
  });

  it('should have the correct message', function() {
    var err = new HTTPError(404, 'Not found!');
    err.message.should.eql('Not found!');
  });

  it('should have the correct status code', function() {
    var err = new HTTPError(404, 'Not found!');
    err.should.have.property('code');
    err.code.should.eql(404);
  });

  it('should allow just a message', function() {
    var err = new HTTPError('test');
    err.message.should.eql('test');
    err.code.should.eql(500);
  });

  it('should allow just a status code', function() {
    var err = new HTTPError(404);
    err.code.should.eql(404);
  });

  it('should look up the correct status codes', function() {
    var codes = Object.keys(http.STATUS_CODES);
    codes = codes.map(function(code) { return parseInt(code) });

    for (var i=0; i<codes.length; i++) {
      var err = new HTTPError(codes[i]);
      err.message.should.eql(http.STATUS_CODES[codes[i]]);
    }
  });

});