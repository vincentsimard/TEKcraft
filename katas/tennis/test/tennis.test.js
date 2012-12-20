(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var Tennis = require('./../Tennis').Tennis;

  describe('Tennis', function() {
    it('should be defined', function() {
      Tennis.should.not.be.undefined;
    });

    describe('players score', function() {
      var game;

      beforeEach(function(done){
        game = new Tennis();
        done();
      });

      var assertScore = function(player1Score, player2Score) {
        game.player1Score().should.equal(player1Score);
        game.player2Score().should.equal(player2Score);
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

      it('should be 15 when a player scores once', function() {
        simulateExchanges(2);
        assertScore(0,15);
      });

      it('should be 15 when both players score once', function() {
        simulateExchanges(1,2);
        assertScore(15,15);
      });

      it('should be 30 when a player scores twice', function() {
        simulateExchanges(1,1);
        assertScore(30,0);
      });

      it('should be 40 when a player scores three times', function() {
        simulateExchanges(1,1,1);
        assertScore(40,0);
      });

      it('should be 40:40 when both players scores three times', function(){
        simulateExchanges(1,1,1,2,2,2);
        assertScore(40,40);
      });

      it('when the score is 40:40 and one of the players scores he gets the advantage', function(){
        simulateExchanges(1,1,1,2,2,2,1);
        assertScore('adv', 40);
      });
    });
  });
})();