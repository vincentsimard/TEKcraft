(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var GameOfLife = require('./../GameOfLife').GameOfLife;

  describe('GameOfLife', function() {
    var gol;

    beforeEach(function(done) {
      gol = new GameOfLife();
      done();
    });

    it('should not have live cells if created empty', function() {
      gol.liveCells.should.be.empty;
    });

    it('should keep live cells if created with cells as parameters', function() {
      gol = new GameOfLife([[0,0]]);
      gol.liveCells.should.eql([[0,0]]);

      gol = new GameOfLife([[1,1], [2,2]]);
      gol.liveCells.should.eql([[1,1], [2,2]]);
    });

    describe('after one step', function() {
      it('should stay empty if it was created empty', function() {
        gol.step();
        gol.liveCells.should.be.empty;
      });

      it('should kill a live cell with no neighbor', function() {
        gol = new GameOfLife([[0,0]]);
        gol.step();
        gol.liveCells.should.be.empty;
      });

      it('should kill a live cell with one neighbor', function() {
        gol = new GameOfLife([[0,0], [1,0]]);
        gol.step();
        gol.liveCells.should.be.empty;
      });

      // @PENDING: Need to count neighbors
      // it('should keep a live cell with two neighbors', function() {
      //   gol = new GameOfLife([[0,0], [1,0], [2,0]]);
      //   gol.step();
      //   gol.liveCells.should.eql([[1,0]]);
      // });
    });

    describe('counting neighbors', function() {
      it('should return zero for a lonely cell', function() {
        gol = new GameOfLife([[0,0]]);
        gol.neighborsTo([0,0]).should.equal(0);
      });
    });
  });
})();