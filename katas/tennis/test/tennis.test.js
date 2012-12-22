(function() {
  'use strict';

  var Game = require('./../tennis').Tennis.Game;

  var chai = require('chai');
  var should = chai.should();



  var PLAYER_1 = '1';
  var PLAYER_2 = '2';



  chai.use(function (_chai, utils) {
    utils.addMethod(chai.Assertion.prototype, 'score', function (score1, score2) {
      var game = utils.flag(this, 'object');

      game.player1Score().should.equal(score1);
      game.player2Score().should.equal(score2);
    });

    utils.addMethod(chai.Assertion.prototype, 'gamePoint', function () {
      var game = utils.flag(this, 'object');
      var truthy = !utils.flag(this, 'negate');

      game.isGamePoint().should.be[truthy];
    });

    utils.addMethod(chai.Assertion.prototype, 'gamePointFor', function (player) {
      var game = utils.flag(this, 'object');
      var truthy = !utils.flag(this, 'negate');
      var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

      game.should.be.gamePoint();

      game['isGamePointForPlayer' + player]().should.be[truthy];
      game['isGamePointForPlayer' + otherPlayer]().should.be[!truthy];
    });
  });



  describe('Tennis.Game', function() {
    var game;

    // Simulates multiple exchanges
    // Parameters: each parameter is the player who wins the exchange
    //   (variable number of parameters)
    // i.e: simulateExchanges(PLAYER_1, PLAYER_1);
    //        -> 2 exchanges won by PLAYER_1
    var simulateExchanges = function() {
      var exchanges = Array.prototype.slice.call(arguments, 0);
      var winner;

      for (var i=0; i < exchanges.length; i++) {
        winner = exchanges[i];
        game['player'+winner+'WinsExchange']();
      }
    };

    var simulateDeuce = function() {
      simulateExchanges(PLAYER_1,PLAYER_1,PLAYER_1,PLAYER_2,PLAYER_2,PLAYER_2);
    };



    beforeEach(function(done) {
      game = new Game();
      done();
    });



    describe('game point', function() {
      it('should not be game point if a player wins at less than 3 exchanges', function() {
        simulateExchanges(PLAYER_1);
        game.should.not.be.gamePoint();

        simulateExchanges(PLAYER_1);
        game.should.not.be.gamePoint();
      });

      it('should be game point if a player wins at least 3 exchanges and the other player has won at least 1 less exchanges', function() {
        simulateExchanges(PLAYER_2,PLAYER_2,PLAYER_2);
        game.should.be.gamePoint();
        game.should.be.gamePointFor(PLAYER_2);
      });

      it('should not be game point if both players have won 3 exchanges', function() {
        simulateDeuce();
        game.should.not.be.gamePoint();
      });

      it('should be game point if a player wins an exchange when it is deuce', function() {
        simulateDeuce();
        simulateExchanges(PLAYER_1);
        game.should.be.gamePointFor(PLAYER_1);
      });
    });

    describe('scoring', function() {
      describe('(normal conditions)', function() {
        it('should be zero at the start of the game', function() {
          game.should.score(0,0);
        });

        it('should be 15 when a player wins an exchange', function() {
          simulateExchanges(PLAYER_2);
          game.should.score(0,15);
        });

        it('should be 30 when a player wins two exchanges', function() {
          simulateExchanges(PLAYER_1,PLAYER_1);
          game.should.score(30,0);
        });

        it('should be 40 when a player wins three exchanges', function() {
          simulateExchanges(PLAYER_1,PLAYER_1,PLAYER_1);
          game.should.score(40,0);
        });

        it('should be 15:15 when both players win one exchange', function() {
          simulateExchanges(PLAYER_1,PLAYER_2);
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
          simulateExchanges(PLAYER_1);
          game.should.score('adv', 40);
        });

        it('should go back to 40:40 when a player having the advantage loses an exchange', function() {
          simulateDeuce();
          simulateExchanges(PLAYER_1,PLAYER_2);
          game.should.score(40,40);
        });

        it('should go back to 40:40 after a ridiculously long game where both players win exchanges back and forth', function() {
          simulateDeuce();
          for (var i=0; i < 20; i++) {
            simulateExchanges(PLAYER_1,PLAYER_2);
          }
          game.should.score(40,40);
        });
      });
      
      describe('(wins)', function() {
        it('should declare a player has won if he wins 4 straight exchanges', function() {
          simulateExchanges(PLAYER_1,PLAYER_1,PLAYER_1,PLAYER_1);
          game.should.score('win',0);

          game = new Game();
          simulateExchanges(PLAYER_2,PLAYER_2,PLAYER_2,PLAYER_2);
          game.should.score(0,'win');
        });

        it('should declare a player has won if he wins an exchange when he has the advantage', function() {
          simulateDeuce();
          simulateExchanges(PLAYER_2,PLAYER_2);
          game.should.score(40,'win');
        });

        it('should throw an error if players try to play when the game has already been won', function() {
          simulateExchanges(PLAYER_1,PLAYER_1,PLAYER_1,PLAYER_1);

          var oneMoreExchange = (function() {
            simulateExchanges(PLAYER_1);
          });

          oneMoreExchange.should.throw(Error); // game player 1, game is over

          game = new Game();
          simulateDeuce();
          oneMoreExchange.should.not.throw(Error); // deuce

          simulateExchanges(PLAYER_2,PLAYER_1,PLAYER_2,PLAYER_1,PLAYER_1);
          oneMoreExchange.should.throw(Error); // game player 1, game is over
        });
      });
    });

    describe('score()', function() {
      it('should translate 0, 15, 30, 40', function() {
        simulateExchanges(PLAYER_1);
        game.score().should.equal('fifteen, love');

        simulateExchanges(PLAYER_1);
        game.score().should.equal('thirty, love');

        simulateExchanges(PLAYER_1);
        game.score().should.equal('forty, love');
      });

      it('should use "all" for equal scores', function() {
        game.score().should.equal('love all');

        simulateExchanges(PLAYER_1,PLAYER_2)
        game.score().should.equal('fifteen all');

        simulateExchanges(PLAYER_1,PLAYER_2)
        game.score().should.equal('thirty all');
      });

      it('should translate deuce', function() {
        simulateDeuce();
        game.score().should.equal('deuce');
      });

      it('should use "advantage #{PLAYER}" for advantages', function() {
        simulateDeuce();
        simulateExchanges(PLAYER_1);
        game.score().should.equal('advantage Player 1');

        simulateExchanges(PLAYER_2,PLAYER_2);
        game.score().should.equal('advantage Player 2');
      });

      it('should use "game #{PLAYER}" for won game', function() {
        simulateExchanges(PLAYER_1,PLAYER_1,PLAYER_1,PLAYER_1);
        game.score().should.equal('game Player 1');

        game = new Game();
        simulateExchanges(PLAYER_2,PLAYER_2,PLAYER_2,PLAYER_2);
        game.score().should.equal('game Player 2');
      });
    });
  });
})();
