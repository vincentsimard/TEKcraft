(function() {
  'use strict';

  var chai = require('chai');
  var chaiThings = require('chai-things');
  var should = chai.should();

  chai.use(chaiThings);

  var GameOfLife = require('./../GameOfLife').GameOfLife;
  var Cell = require('./../Cell').Cell;



  chai.use(function (_chai, utils) {
    utils.addMethod(chai.Assertion.prototype,
      'containCells', function (cells) {
        var game = utils.flag(this, 'object');
        var cell;

        for (var i = 0; i < cells.length; i++) {
          cell = cells[i];
          game.liveCells.should.include.something.that.deep.equals(cell);
        }
      }
    );
  });



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
      gol = new GameOfLife(withCellsAt([0,0]));
      gol.liveCells.should.eql(withCellsAt([0,0]));

      gol = new GameOfLife(withCellsAt([1,1], [2,2]));
      gol.liveCells.should.eql(withCellsAt([1,1], [2,2]));
    });

    describe('after one step', function() {
      function gameAfterOneStep(cells) {
        gol = new GameOfLife(cells);
        gol.step();

        return gol;
      }

      it('should stay empty if it was created empty', function() {
        gameAfterOneStep().liveCells.should.be.empty;
      });

      it('should kill a live cell with no neighbor', function() {
        var startCells = withCellsAt([0,0]);
        gameAfterOneStep(startCells).liveCells.should.be.empty;
      });

      it('should kill a live cell with one neighbor', function() {
        var startCells = withCellsAt([0,0], [1,0]);
        gameAfterOneStep(startCells).liveCells.should.be.empty;
      });

      it('should keep a live cell with two neighbors', function() {
        var startCells = withCellsAt([0,0], [1,1], [2,0]);
        var endCells = withCellsAt([1,1]);

        gameAfterOneStep(startCells).should.containCells(endCells);
      });

      it('should keep a live cell with three neighbors', function() {
        var startCells = withCellsAt([0,0], [1,1], [2,0], [2,2]);
        var endCells = withCellsAt([1,1]);

        gameAfterOneStep(startCells).should.containCells(endCells);
      });

      it('should kill a live cell with more than three neighbors', function() {
        var startCells = withCellsAt([0,0], [1,0], [2,0], [0,1], [1,1]);
        var endCells = withCellsAt([0,0], [2,0], [0,1]);

        gameAfterOneStep(startCells).should.containCells(endCells);
      });

      it('should revive a dead cell with three neighbors', function() {
        var startCells = withCellsAt([2,2], [3,1], [3,3]);
        var endCells = withCellsAt([3,2]);

        gameAfterOneStep(startCells).should.containCells(endCells);
      });
    });

    describe('counting neighbors', function() {
      function neighborCountForCells() {
        var cells = withCellsAt.apply(this, arguments);
        gol = new GameOfLife(cells);

        return function(x, y) {
          return gol.neighborsTo(x, y);
        };
      }

      it('should return zero for a lonely cell', function() {
        neighborCountForCells()(0, 0).should.equal(0);
      });

      it('should not count the current location as a neighbor', function() {
        neighborCountForCells([3,2])(3, 2).should.equal(0);
      });

      it('should count cells below', function() {
        neighborCountForCells([5,4])(5, 5).should.equal(1);
      });

      it('should count cells above', function() {
        neighborCountForCells([4,6], [5,6])(5, 5).should.equal(2);
      });

      it('should not count cells that are not immediatly adjacent to the location', function() {
        neighborCountForCells([2,0])(0, 0).should.equal(0);
      });
    });

    describe('dimensions of the GameOfLife environment', function() {
      it('should have 0 width and height when created empty', function() {
        gol.width().should.equal(0);
        gol.height().should.equal(0);
      });

      it('should have 1 width and height when created with a single cell', function() {
        gol = new GameOfLife(withCellsAt([0,0]));

        gol.width().should.equal(1);
        gol.height().should.equal(1);
      });

      it('should have 2 width and height when created with a block of 4 cells', function() {
        gol = new GameOfLife(withCellsAt([0,0], [0,1], [1,0], [1,1]));

        gol.width().should.equal(2);
        gol.height().should.equal(2);
      });
    });
  });
})();