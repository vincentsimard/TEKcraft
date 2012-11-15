(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var GameOfLife = require('./../gol').GameOfLife;

  var gol;

  beforeEach(function() {
    gol = new GameOfLife();
  });



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

          var blah = [];

          fnValid.should.not.throw(Error);
          fnUndefined.should.not.throw(Error);
          fnInvalid1.should.throw(Error);
          fnInvalid2.should.throw(Error);
          fnInvalid3.should.throw(Error);
        });

        it('should set the grid dimensions when receiving an array of 2 numbers', function() {
          function testGridDimensions(dimensions) {
            gol = new GameOfLife(dimensions);
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
            gol = new GameOfLife(dimensions);
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
      it('should be defined', function() {
        gol.grid.should.not.be.undefined;
      });

      it('should have 8x8 dimensions by default', function() {
        var xLen = gol.grid.length;
        var yLen = gol.grid[0].length;

        xLen.should.equal(8);
        yLen.should.equal(8);
      });



      describe('spawn()', function() {
        it('should set a cell to life', function() {
          gol.spawn(1,2);
          gol.spawn(4,3);

          gol.grid[1][2].should.be.true;
          gol.grid[4][3].should.be.true;
        });

        it('should throw an error when trying to spawn a cell that is out of bound', function() {
          var fnInvalid = (function() { gol.spawn(9,9); });

          fnInvalid.should.throw(RangeError);
        });
      });

      describe('kill()', function() {
        it('should kill a cell', function() {
          gol.spawn(6,7);
          gol.kill(6,7);

          gol.grid[6][7].should.be.false;
        });

        it('should throw an error when trying to kill a cell that is out of bound', function() {
          var fnInvalid = (function() { gol.kill(9,9); });

          fnInvalid.should.throw(RangeError);
        });
      });
    });



    describe('step()', function() {
      it('should be defined', function() {
        gol.step.should.not.be.undefined;
        gol.step.should.be.a('function');
      });

      it('should return all dead cells if all other cells are dead', function() {
        var defaultGrid = [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '']
        ];

        gol.step();

        gol.grid.join('').should.equal(defaultGrid.join(''));
      });
    });



    describe('print()', function() {
      it('should be defined', function() {
        gol.print.should.not.be.undefined;
        gol.print.should.be.a('function');
      });

      it('should output the default grid', function() {
        var output = '........\n' +
                     '........\n' +
                     '........\n' +
                     '........\n' +
                     '........\n' +
                     '........\n' +
                     '........\n' +
                     '........\n';

        gol.print().should.equal(output);
      });

      it('should output a custom dimensions grid', function() {
        var output = '..\n' + 
                     '..\n' +
                     '..\n';

        gol = new GameOfLife([3,2]);
        gol.print().should.equal(output);
      });

      it('should output a * for live cells', function() {
        var output, liveCell1, liveCell2;

        gol.spawn(0,0);
        gol.spawn(6,0);

        output = gol.print();
        liveCell1 = output.charAt(0);
        liveCell2 = output.charAt(6);

        liveCell1.should.equal('*');
        liveCell2.should.equal('*');
      });
    });
  });
})();