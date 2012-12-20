(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var Game = require('./../Tennis').Tennis.Game;

  describe('TennisGame', function() {
    var game;

    beforeEach(function(done) {
      game = new Game();
      done();
    });

    var simulateExchanges = function() {
      var exchanges = Array.prototype.slice.call(arguments, 0);
      var winner;

      for (var i=0; i < exchanges.length; i++) {
        winner = exchanges[i];
        game['player'+winner+'WinsExchange']();
      }
    };

    it('should be defined', function() {
      Game.should.not.be.undefined;
    });

    describe('game point', function() {
      it('should not be game point if a player wins at less than 3 exchanges', function() {
        simulateExchanges(1);
        game.isGamePoint().should.be.false;

        simulateExchanges(1);
        game.isGamePoint().should.be.false;
      });

      it('should be game point if a player wins at least 3 exchanges and the other player has won at least 1 less exchanges', function() {
        simulateExchanges(2,2,2);
        game.isGamePoint().should.be.true;
        game.isGamePointFor(0).should.be.false;
        game.isGamePointFor(1).should.be.true;
      });

      it('should not be game point if both players have won 3 exchanges', function() {
        simulateExchanges(2,2,2,1,1,1);
        game.isGamePoint().should.be.false;
        game.isGamePointFor(0).should.be.false;
        game.isGamePointFor(1).should.be.false;
      });

      it('should be game point if a player wins an exchange when it is deuce', function() {
        simulateExchanges(2,2,2,1,1,1,2);
        game.isGamePoint().should.be.true;
        game.isGamePointFor(0).should.be.false;
        game.isGamePointFor(1).should.be.true;
      });
    });

    describe('score', function() {
      var assertScore = function(score1, score2) {
        game.player1Score().should.equal(score1);
        game.player2Score().should.equal(score2);
      };

      describe('(normal conditions)', function() {
        it('should be zero at the start of the game', function() {
          assertScore(0,0);
        });

        it('should be 15 when a player wins an exchange', function() {
          simulateExchanges(2);
          assertScore(0,15);
        });

        it('should be 30 when a player wins two exchanges', function() {
          simulateExchanges(1,1);
          assertScore(30,0);
        });

        it('should be 40 when a player wins three exchanges', function() {
          simulateExchanges(1,1,1);
          assertScore(40,0);
        });

        it('should be 15:15 when both players win one exchange', function() {
          simulateExchanges(1,2);
          assertScore(15,15);
        });

        it('should be 40:40 when both players win three exchanges', function(){
          simulateExchanges(1,1,1,2,2,2);
          assertScore(40,40);
        });
      });

      describe('(advantages)', function() {
        it('should be adv:40 when the score is 40:40 and a wins an exchange', function() {
          simulateExchanges(1,1,1,2,2,2,1);
          assertScore('adv', 40);
        });

        it('should go back to 40:40 when a player having the advantage loses an exchange', function() {
          simulateExchanges(1,1,1,2,2,2,1,2);
          assertScore(40,40);
        });

        it('should go back to 40:40 after a ridiculously long game where both players win exchanges back and forth', function() {
          simulateExchanges(1,1,1,2,2,2);
          for (var i=0; i < 20; i++) {
            simulateExchanges(1,2);
          }
          assertScore(40,40);
        });
      });
      
      describe('(wins)', function() {
        it('should declare a player has won if he wins 4 straight exchanges', function() {
          game = new Game();
          simulateExchanges(1,1,1,1);
          assertScore('win',0);

          game = new Game();
          simulateExchanges(2,2,2,2);
          assertScore(0,'win');
        });

        it('should declare a player has won if he wins an exchange when he has the advantage', function() {
          simulateExchanges(1,1,1,2,2,2,2,2);
          assertScore(40, 'win');
        });

        it('should throw an error if players try to play when the game has already been won', function() {
          game = new Game();
          simulateExchanges(1,1,1,1);

          var fnInvalidExchange = (function() {
            simulateExchanges(1);
          });

          fnInvalidExchange.should.throw(Error);

          game = new Game();
          simulateExchanges(1,2,1,2,1,2,1,2,1,1);

          var fnInvalidExchange = (function() {
            simulateExchanges(1);
          });

          fnInvalidExchange.should.throw(Error);
        });
      });
    });
  });
})();
