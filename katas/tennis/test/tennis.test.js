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

    utils.addMethod(chai.Assertion.prototype, 'deuce', function () {
      var game = utils.flag(this, 'object');

      game.should.score(40,40);
    });

    utils.addMethod(chai.Assertion.prototype, 'over', function () {
      var game = utils.flag(this, 'object');
      var truthy = !utils.flag(this, 'negate');

      game.isOver().should.be[truthy];
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
      game = new Game();
      simulateExchanges(
        PLAYER_1,
        PLAYER_1,
        PLAYER_1,
        PLAYER_2,
        PLAYER_2,
        PLAYER_2
      );
    };

    var simulateSweepFor = function(player) {
      game = new Game();
      simulateExchanges(
        player,
        player,
        player,
        player
      );

      game.should.be.over();
    }



    beforeEach(function(done) {
      game = new Game();
      done();
    });



    describe('points', function() {
      // Normal scoring
      it('should be zero at the start of the game', function() {
        game.should.score(0,0);
      });

      it('should be 15 when a player wins one exchange', function() {
        simulateExchanges(PLAYER_2);
        game.should.score(0,15);

        simulateExchanges(PLAYER_1);
        game.should.score(15,15);
      });

      it('should be 30 when a player wins two exchanges', function() {
        simulateExchanges(PLAYER_1,PLAYER_1);
        game.should.score(30,0);

        simulateExchanges(PLAYER_2,PLAYER_2);
        game.should.score(30,30);
      });

      it('should be 40 when a player wins three exchanges', function() {
        simulateExchanges(PLAYER_2,PLAYER_2,PLAYER_2);
        game.should.score(0,40);

        simulateExchanges(PLAYER_1,PLAYER_1,PLAYER_1);
        game.should.score(40,40);
      });

      // Deuce
      it('should be deuce when both players win three exchanges', function() {
        simulateDeuce();
        game.should.be.deuce();
      });

      it('should be deuce when a player having the advantage loses an exchange', function() {
        simulateDeuce();
        simulateExchanges(PLAYER_1,PLAYER_2);
        game.should.be.deuce();
      });

      it('should be deuce after a ridiculously long game where both players win exchanges back and forth', function() {
        for (var i=0; i < 20; i++) {
          simulateExchanges(PLAYER_1,PLAYER_2);
        }
        game.should.be.deuce();
      });

      // Advantages
      it('should be advantage for a player who wins an exchange when it is deuce', function() {
        simulateDeuce();
        simulateExchanges(PLAYER_1);
        game.should.score('adv',40);
      });
      
      // Wins
      it('should show a player has won if he wins 4 straight exchanges', function() {
        simulateSweepFor(PLAYER_1);
        game.should.score('win',0);

        simulateSweepFor(PLAYER_2);
        game.should.score(0,'win');
      });

      it('should show a player has won if he wins an exchange when he has the advantage', function() {
        simulateDeuce();
        simulateExchanges(PLAYER_2,PLAYER_2);
        game.should.score(40,'win');
      });
    });

    // Game point
    it('should not be game point if a player wins less than 3 exchanges', function() {
      simulateExchanges(PLAYER_1);
      game.should.not.be.gamePoint();

      simulateExchanges(PLAYER_1);
      game.should.not.be.gamePoint();
    });

    it('should be game point if a player wins at least 3 exchanges', function() {
      simulateExchanges(PLAYER_2,PLAYER_2,PLAYER_2);
      game.should.be.gamePoint();
      game.should.be.gamePointFor(PLAYER_2);
    });

    it('should not be game point if both players have won 3 exchanges (deuce)', function() {
      simulateDeuce();
      game.should.not.be.gamePoint();
    });

    it('should be game point after a player wins an exchange when it is deuce', function() {
      simulateDeuce();
      simulateExchanges(PLAYER_1);
      game.should.be.gamePointFor(PLAYER_1);
    });

    it('should throw an error if players try to play when the game is over', function() {
      simulateSweepFor(PLAYER_1);

      var oneMoreExchange = (function() {
        simulateExchanges(PLAYER_1);
      });

      oneMoreExchange.should.throw(Error); // game player 1, game is over

      simulateDeuce();
      oneMoreExchange.should.not.throw(Error); // deuce

      simulateExchanges(PLAYER_2,PLAYER_1,PLAYER_1);
      oneMoreExchange.should.throw(Error); // game player 1, game is over
    });

    describe('score()', function() {
      it('should translate points (0, 15, 30, 40)', function() {
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

      it('should translate "40 all" to "deuce"', function() {
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
        simulateSweepFor(PLAYER_1);
        game.score().should.equal('game Player 1');

        simulateSweepFor(PLAYER_2);
        game.score().should.equal('game Player 2');
      });
    });
  });
})();
