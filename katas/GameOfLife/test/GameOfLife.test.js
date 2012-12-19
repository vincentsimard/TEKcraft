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
      var nextCycleCells = function() {
        var grid = new Grid();
        Grid.apply(grid, arguments);
        return grid.spawn().liveCells;
      };

      it('should spawn an empty board if empty', function() {
        nextCycleCells().should.be.empty;
      });

      it('should kill a lonely cell', function() {
        nextCycleCells([1,1]).should.be.empty;
      });

      // @TODO: Replace eql with include (for arrays)!
      it('should keep a cell with two neighbors', function() {
        nextCycleCells([1,1], [2,0], [2,2]).should.eql([[1,1]]);
      });

      it('should keep a cell with three neighbors', function() {
        nextCycleCells([1,1], [0,0], [2,0], [2,2]).should.eql([[1,1]]);
      });

      // @TODO:
      it('should revive a cell with three neighbors', function() {
        // nextCycleCells([0,0], [2,0], [2,2]).should.eql([[1,1]]);
      });
    });

    // @TODO: Create a method that returns if the cell is alive or not

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