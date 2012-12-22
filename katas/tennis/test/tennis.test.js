(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();
  var Assertion = chai.Assertion;

  Assertion.addMethod('score', function (score1, score2) {
      var game = this._obj;

      game.player1Score().should.equal(score1);
      game.player2Score().should.equal(score2);
  });

  var Game = require('./../tennis').Tennis.Game;

  describe('Tennis.Game', function() {
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

    var simulateDeuce = function() {
      simulateExchanges(1,1,1,2,2,2);
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
        game.isGamePointForPlayer1().should.be.false;
        game.isGamePointForPlayer2().should.be.true;
      });

      it('should not be game point if both players have won 3 exchanges', function() {
        simulateDeuce();
        game.isGamePoint().should.be.false;
        game.isGamePointForPlayer1().should.be.false;
        game.isGamePointForPlayer2().should.be.false;
      });

      it('should be game point if a player wins an exchange when it is deuce', function() {
        simulateDeuce();
        simulateExchanges(2);
        game.isGamePoint().should.be.true;
        game.isGamePointForPlayer1().should.be.false;
        game.isGamePointForPlayer2().should.be.true;
      });
    });

    describe('scoring', function() {
      describe('(normal conditions)', function() {
        it('should be zero at the start of the game', function() {
          game.should.score(0,0);
        });

        it('should be 15 when a player wins an exchange', function() {
          simulateExchanges(2);
          game.should.score(0,15);
        });

        it('should be 30 when a player wins two exchanges', function() {
          simulateExchanges(1,1);
          game.should.score(30,0);
        });

        it('should be 40 when a player wins three exchanges', function() {
          simulateExchanges(1,1,1);
          game.should.score(40,0);
        });

        it('should be 15:15 when both players win one exchange', function() {
          simulateExchanges(1,2);
          game.should.score(15,15);
        });

        it('should be 40:40 when both players win three exchanges', function(){
          simulateDeuce();
          game.should.score(40,40);
        });
      });

      describe('(advantages)', function() {
        it('should be adv:40 when the score is 40:40 and a wins an exchange', function() {
          simulateDeuce();
          simulateExchanges(1);
          game.should.score('adv', 40);
        });

        it('should go back to 40:40 when a player having the advantage loses an exchange', function() {
          simulateDeuce();
          simulateExchanges(1,2);
          game.should.score(40,40);
        });

        it('should go back to 40:40 after a ridiculously long game where both players win exchanges back and forth', function() {
          simulateDeuce();
          for (var i=0; i < 20; i++) {
            simulateExchanges(1,2);
          }
          game.should.score(40,40);
        });
      });
      
      describe('(wins)', function() {
        it('should declare a player has won if he wins 4 straight exchanges', function() {
          simulateExchanges(1,1,1,1);
          game.should.score('win',0);

          game = new Game();
          simulateExchanges(2,2,2,2);
          game.should.score(0,'win');
        });

        it('should declare a player has won if he wins an exchange when he has the advantage', function() {
          simulateDeuce();
          simulateExchanges(2,2);
          game.should.score(40, 'win');
        });

        it('should throw an error if players try to play when the game has already been won', function() {
          simulateExchanges(1,1,1,1);

          var fnInvalidExchange = (function() {
            simulateExchanges(1);
          });

          fnInvalidExchange.should.throw(Error);

          game = new Game();
          simulateDeuce();
          simulateExchanges(1,2,1,1);

          fnInvalidExchange.should.throw(Error);
        });
      });
    });

    describe('score()', function() {
      it('should translate 0, 15, 30, 40', function() {
        simulateExchanges(1);
        game.score().should.equal('fifteen, love');

        simulateExchanges(1);
        game.score().should.equal('thirty, love');

        simulateExchanges(1);
        game.score().should.equal('forty, love');
      });

      it('should use "all" for equal scores', function() {
        game.score().should.equal('love all');

        simulateExchanges(1,2)
        game.score().should.equal('fifteen all');

        simulateExchanges(1,2)
        game.score().should.equal('thirty all');
      });

      it('should translate deuce', function() {
        simulateExchanges(1,1,1,2,2,2);
        game.score().should.equal('deuce');
      });

      it('should use "advantage #{PLAYER}" for advantages', function() {
        simulateExchanges(1,1,1,2,2,2,1);
        game.score().should.equal('advantage Player 1');

        simulateExchanges(2,2);
        game.score().should.equal('advantage Player 2');
      });

      it('should use "game #{PLAYER}" for won game', function() {
        simulateExchanges(1,1,1,1);
        game.score().should.equal('game Player 1');

        game = new Game();
        simulateExchanges(2,2,2,2);
        game.score().should.equal('game Player 2');
      });
    });
  });
})();
