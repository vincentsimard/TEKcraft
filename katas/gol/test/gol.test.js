(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var GameOfLife = require('./../gol').GameOfLife;

  describe('GameOfLife', function() {
    it('should be defined', function() {
      GameOfLife.should.not.be.undefined;
    });



    describe('arguments', function() {
      it('should be optional', function() {
        var fnNoArguments = (function() {
          new GameOfLife();
        });

        fnNoArguments.should.not.throw(Error);
      });

      describe('first argument', function() {
        it('should throw if it is not: falsy, a number, or an array of 2 numbers', function() {
          var fnValid = (function() {
            new GameOfLife([1,2]);
            new GameOfLife(1);
          });

          var fnUndefined = (function() {
            new GameOfLife();
            new GameOfLife(undefined);
          });

          var fnInvalid1 = (function() { new GameOfLife('a'); });
          var fnInvalid2 = (function() { new GameOfLife([1, 'a']); });
          var fnInvalid3 = (function() { new GameOfLife({}); });

          fnValid.should.not.throw(Error);
          fnUndefined.should.not.throw(Error);
          fnInvalid1.should.throw(Error);
          fnInvalid2.should.throw(Error);
          fnInvalid3.should.throw(Error);
        });

        it('should set the grid dimensions when receiving an array of 2 numbers', function() {
          function testGridDimensions(dimensions) {
            var gol = new GameOfLife(dimensions);
            var xLen = gol.grid.length;
            var yLen = gol.grid[0].length;

            xLen.should.equal(dimensions[0]);
            yLen.should.equal(dimensions[1]);
          }

          testGridDimensions([2,2]);
          testGridDimensions([25,32]);
        });

        it('should set the grid dimensions when receiving a number', function() {
          function testGridDimensions(dimensions) {
            var gol = new GameOfLife(dimensions);
            var xLen = gol.grid.length;
            var yLen = gol.grid[0].length;

            xLen.should.equal(dimensions);
            yLen.should.equal(dimensions);
          }

          testGridDimensions(9);
          testGridDimensions(12);
        });
      });
    });



    describe('grid', function() {
      it('should be defined as an array', function() {
        new GameOfLife().grid.should.not.be.undefined;
        new GameOfLife().grid.should.be.instanceof(Array);
      });

      it('should have 8x8 dimensions by default', function() {
        var gol = new GameOfLife();
        var xLen = gol.grid.length;
        var yLen = gol.grid[0].length;

        xLen.should.equal(8);
        yLen.should.equal(8);
      });
    });



    describe('step()', function() {
      it('should be defined as a function', function() {
        new GameOfLife().step.should.not.be.undefined;
        new GameOfLife().step.should.be.a('function');
      });
    });
  });
})();