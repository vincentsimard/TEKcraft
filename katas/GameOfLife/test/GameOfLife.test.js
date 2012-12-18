(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var Grid = require('./../Grid').Grid;

  describe('Grid', function() {
    var grid;

    beforeEach(function() {
      grid = new Grid();
    });

    it('should be defined', function() {
      Grid.should.not.be.undefined;
    });

    it('should be empty if created empty', function() {
      grid.liveCells.should.be.empty;
    });

    it('should have the cells created with it', function() {
      grid = new Grid([1,1], [2,2]);
      grid.liveCells.should.eql([[1,1], [2,2]]);
    });

    it('should spawn an empty board if empty', function() {
      grid.spawn().liveCells.should.be.empty;
    });

    it('should kill a lonely cell', function() {
      grid.spawn().liveCells.should.be.empty;
    });

    it('should keep a cell with two neighbors'
    // @Pending: Need a way to count neighbors
    /*
    , function() {
      var grid = new Grid([1,1], [2,0], [2,2]);
      grid.spawn().liveCells.should.eql([1,1]);
    }
    */
    );

    describe('counting neighbors', function() {
      it('should find zero neighbors to a lonely cell', function() {
        grid = new Grid([1,1]);
        grid.neighborsTo(1,1).should.equal(0);
      });

      it('should find a neighbor to a single cell', function() {
        grid = new Grid([1,1]);
        grid.neighborsTo(0,0).should.equal(1);
        grid.neighborsTo(0,1).should.equal(1);
        grid.neighborsTo(0,2).should.equal(1);
        grid.neighborsTo(1,0).should.equal(1);
        grid.neighborsTo(1,2).should.equal(1);
        grid.neighborsTo(2,0).should.equal(1);
        grid.neighborsTo(2,1).should.equal(1);
        grid.neighborsTo(2,2).should.equal(1);
      });
    });
  });

// 17:00
})();