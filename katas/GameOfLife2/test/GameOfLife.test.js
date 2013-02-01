(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var GameOfLife = require('./../GameOfLife').GameOfLife;
  var Cell = require('./../Cell').Cell;

  describe('GameOfLife', function() {
    var gol;

    beforeEach(function(done) {
      gol = new GameOfLife();
      done();
    });

    function withCellsAt() {
      var cells = [];
      var cell;

      for (var i = 0; i < arguments.length; i++) {
        cell = new Cell(arguments[i][0], arguments[i][1]);
        cells.push(cell);
      }

      return cells;
    }

    it('should not have live cells if created empty', function() {
      gol.liveCells.should.be.empty;
    });

    it('should keep live cells if created with cells as parameters', function() {
      var cells1 = withCellsAt([0,0]);
      var cells2 = withCellsAt([1,1], [2,2]);

      gol = new GameOfLife(cells1);
      gol.liveCells.should.eql(cells1);

      gol = new GameOfLife(cells2);
      gol.liveCells.should.eql(cells2);
    });

    describe('after one step', function() {
      it('should stay empty if it was created empty', function() {
        gol.step();
        gol.liveCells.should.be.empty;
      });

      it('should kill a live cell with no neighbor', function() {
        var cells = withCellsAt([0,0]);

        gol = new GameOfLife(cells);
        gol.step();
        gol.liveCells.should.be.empty;
      });

      it('should kill a live cell with one neighbor', function() {
        var cells = withCellsAt([0,0], [1,0]);

        gol = new GameOfLife(cells);
        gol.step();
        gol.liveCells.should.be.empty;
      });

      // @PENDING: Need to count neighbors
      // it('should keep a live cell with two neighbors', function() {
      //   gol = new GameOfLife([[0,0], [1,0], [2,0]]);
      //   gol.step();
      //   gol.liveCells.should.eql([[1,0]]);
      // });

      it('should keep a live cell with two or three neighbors');
      it('should kill a live cell with more than three neighbors');
      it('should revive a dead cell with three neighbors');
    });

    describe('counting neighbors', function() {
      it('should return zero for a lonely cell', function() {
        gol.neighborsTo(0,0).should.equal(0);
      });

      it('should not count the current location as a neighbor', function() {
        var cells = withCellsAt([3,2]);

        gol = new GameOfLife(cells);
        gol.neighborsTo(3,2).should.equal(0);
      });

      it('should count cells below', function() {
        var cells = withCellsAt([5,4]);

        gol = new GameOfLife(cells);
        gol.neighborsTo(5,5).should.equal(1);
      });

      it('should count cells above', function() {
        var cells = withCellsAt([4,6], [5,6]);

        gol = new GameOfLife(cells);
        gol.neighborsTo(5,5).should.equal(2);
      });

      it('should not count cells that are not immediatly adjacent to the location', function() {
        var cells = withCellsAt([2,0]);

        gol = new GameOfLife(cells);
        gol.neighborsTo(0,0).should.equal(0);
      });

      // it('should return zero for a location with a cell at two squares away', function() {
      //   var cells = withCellsAt([0,0]);

      //   gol = new 
      // });
    });
  });

  describe('Cell', function() {
    it('should keep coordinates', function() {
      var cell = new Cell(0,0);

      cell.x.should.equal(0);
      cell.y.should.equal(0);
    });
  });

  describe('Array', function() {
    describe('.contains', function() {
      it('should return false if no parameters are passed', function() {
        [].contains().should.be.false;
      });

      it('should return false if the array is not contained in the array', function() {
        [].contains([1]).should.be.false;
      });

      it('should return true if the array is contained in the array', function() {
        var loc = new Cell(5,5);
        var otherLoc = new Cell(5,5);

        [loc].contains(otherLoc).should.be.true;
      });
    });
  });
})();