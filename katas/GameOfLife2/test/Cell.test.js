(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var Cell = require('./../Cell').Cell;

  describe('Cell', function() {
    it('should keep coordinates', function() {
      var cell = new Cell(0,0);

      cell.x.should.equal(0);
      cell.y.should.equal(0);
    });
  });
})();