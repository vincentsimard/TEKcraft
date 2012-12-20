(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var Tennis = require('./../Tennis').Tennis;

  describe('Tennis', function() {
    it('should be defined', function() {
      Tennis.should.not.be.undefined;
    });

    // @TODO: Add the concept of game/set/match to distinguish different scores

    describe('players score', function() {
      var game;

      beforeEach(function(done) {
        game = new Tennis();
        done();
      });

      var assertScore = function(score1, score2) {
        game.player1Score().should.equal(score1);
        game.player2Score().should.equal(score2);
      };

      var simulateExchanges = function() {
        var exchanges = Array.prototype.slice.call(arguments, 0);
        var winner;

        for (var i=0; i < exchanges.length; i++) {
          winner = exchanges[i];
          game['player'+winner+'WinsExchange']();
        }
      };

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

      it('should be adv:40 when the score is 40:40 and a wins an exchange', function() {
        simulateExchanges(1,1,1,2,2,2,1);
        assertScore('adv', 40);
      });

      it('should go back to 40:40 when a player having the advantage loses an exchange'
      /*
      @PENDING: Handle losing advantage
      , function() {
        simulateExchanges(1,1,1,2,2,2,1,2);
        assertScore(40,40);
      }*/
      );
    });
  });
})();
