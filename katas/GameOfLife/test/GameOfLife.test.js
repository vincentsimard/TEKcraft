(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var Grid = require('./../Grid').Grid;

  describe('Grid', function() {
    it('should be defined', function() {
      Grid.should.not.be.undefined;
    });

    it('should be empty if created empty', function() {
      new Grid().liveCells.should.be.empty;
    });

    it('should have the cells created with it', function() {
      new Grid([1,1], [2,2]).liveCells.should.eql([[1,1], [2,2]]);
    });

    describe('spawn', function() {
      var nextCycleGrid = function() {
        var grid = new Grid();
        Grid.apply(grid, arguments);
        return grid.spawn();
      };

      var assertIsAliveAfterCycle = function() {
        var nextGrid = nextCycleGrid.apply(null, arguments);
        return function(cell) {
          nextGrid.liveCells.containsArray(cell).should.be.true;
        }
      };

      var assertIsDeadAfterCycle = function() {
        var nextGrid = nextCycleGrid.apply(null, arguments);
        return function(cell) {
          nextGrid.liveCells.containsArray(cell).should.be.false;
        }
      };

      it('should spawn an empty board if empty', function() {
        nextCycleGrid().liveCells.should.be.empty;
      });

      it('should kill a lonely cell', function() {
        nextCycleGrid([1,1]).liveCells.should.be.empty;
      });

      it('should kill a cell with one neighbor', function() {
        nextCycleGrid([0,0], [0,1]).liveCells.should.be.empty;
      });

      it('should keep a cell with two neighbors', function() {
        assertIsAliveAfterCycle([1,1], [2,0], [2,2])([1,1]);
      });

      it('should keep a cell with three neighbors', function() {
        assertIsAliveAfterCycle([1,1], [0,0], [2,0], [2,2])([1,1]);
      });

      it('should kill a cell with more than three neighbors', function() {
        assertIsDeadAfterCycle([0,0], [0,1], [0,2], [1,0])([1,1]);
      });

      it('should revive a dead cell with three neighbors', function() {
        assertIsAliveAfterCycle([0,0], [2,0], [2,2])([1,1]);
      });

      describe('misc test formations', function() {
        it('should handle the star formation', function() {
          var star = [[0,0], [2,0], [1,1], [0,2], [2,2]];
          var starResult = [[1,0], [0,1], [2,1], [1,2]];

          for (var i = 0; i < starResult.length; i++) {
            assertIsAliveAfterCycle.apply(this, star)(starResult[i]);
          }
        });

        /*
        it('should handle the blinker formation', function() {
          var blinker = [[1,0], [1,1], [1,2]];
          var blinkerResult = [[0,1], [1,1], [2,1]];

          // var result = nextCycleGrid.apply(this, blinker);
          // console.log(result);

          for (var i = 0; i < blinkerResult.length; i++) {
            assertIsAliveAfterCycle.apply(this, blinker)(blinkerResult[i]);
          }
        });
        */
      });
    });

    describe('counting neighbors', function() {
      it('should find zero neighbors to a lonely cell', function() {
        new Grid([1,1]).neighborsTo(1,1).should.equal(0);
      });

      it('should find a neighbor to a single cell', function() {
        var grid = new Grid([1,1]);
        grid.neighborsTo(0,0).should.equal(1);
        grid.neighborsTo(0,1).should.equal(1);
        grid.neighborsTo(0,2).should.equal(1);
        grid.neighborsTo(1,0).should.equal(1);
        grid.neighborsTo(1,2).should.equal(1);
        grid.neighborsTo(2,0).should.equal(1);
        grid.neighborsTo(2,1).should.equal(1);
        grid.neighborsTo(2,2).should.equal(1);
      });

      it('should handle cells with two neighbors', function() {
        var grid = new Grid([0,0], [2,2]);
        grid.neighborsTo(1,1).should.equal(2);
      });
    });

    describe('grid dimensions', function() {
      var assertDimensions = function() {
        var grid = new Grid();
        Grid.apply(grid, arguments);

        return function(dimensions) {
          grid.width.should.equal(dimensions[0]);
          grid.height.should.equal(dimensions[1]);
        }
      };

      it('should have width:0 and height:0 for an empty grid', function() {
        assertDimensions()([0,0]);
      });

      it('should have width:1 and height:1 for a single cell', function() {
        assertDimensions([0,0])([1,1]);
      });

      it('should calculate the proper width and height for multiple cells grid', function() {
        assertDimensions([0,0],[2,3])([3,4]);
        assertDimensions([-1000,-1000],[1000,1000])([2001,2001]);
        assertDimensions([0,0],[2,3],[-13,102])([16,103]);
      });
    });
  });
})();