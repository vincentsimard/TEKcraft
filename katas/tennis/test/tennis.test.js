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
      it('should be zero at the start of the game', function() {
        var game = new Tennis();
        game.player1score.should.equal(0);
        game.player2score.should.equal(0);
      });

      it('should be 15 when a player scores once', function() {
        var game = new Tennis();
        game.winExchange('player2');
        game.player2score.should.equal(15);
      });

      it('should be 15 when both players score once', function() {
        var game = new Tennis();
        game
          .winExchange('player1')
          .winExchange('player2');
        game.player1score.should.equal(15);
        game.player1score.should.equal(15);
      });

      it('should be 30 when a player scores twice', function() {
        var game = new Tennis('player1', 'player2');
        game
          .winExchange('player1')
          .winExchange('player1');
        game.player1score.should.equal(30);
      });

      it('should be 40 when a player scores three times', function() {
        var game = new Tennis();
        game
          .winExchange('player1')
          .winExchange('player1')
          .winExchange('player1');
        game.player1score.should.equal(40);
      });
      it('should be 40:40 when both players scores three times', function(){
        var game = new Tennis();
        game
          .winExchange('player1')
          .winExchange('player1')
          .winExchange('player1');
        game.player1score.should.equal(40);
        game
          .winExchange('player2')
          .winExchange('player2')
          .winExchange('player2');
        game.player2score.should.equal(40);
      });

      it('when the score is 40:40 and one of the players scores he gets the advantage', function(){
        var game = new Tennis();
        game
          .winExchange('player1')
          .winExchange('player1')
          .winExchange('player1')
        
          .winExchange('player2')
          .winExchange('player2')
          .winExchange('player2')

          .winExchange('player1');

        game.player1score.should.equal('advantage');
      });
    });
  });
})();