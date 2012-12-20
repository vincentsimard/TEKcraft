(function () {
  'use strict';

  var GAME_PTS = [0, 15, 30, 40];
  var PLAYER_1 = 0;
  var PLAYER_2 = 1;

  var Tennis = function() {
    this.score = [GAME_PTS[0],GAME_PTS[0]];
  };

  Tennis.prototype.addPointToPlayer = function(player) {
    var score = this.score[player];
    var index = GAME_PTS.indexOf(score);

    if (this.isOver()) { throw new Error(); }

    if (this.isDeuce()) {
      this.score[player] = 'adv';
    } else if (this.isGamePoint()) {
      // Win
      if (this.isGamePointFor(player)) {
        this.score[player] = 'win';
      // Back to deuce
      } else if (this.player1Score() === 'adv' || this.player2Score() === 'adv') {
        this.score[PLAYER_1] = GAME_PTS[GAME_PTS.length - 1];
        this.score[PLAYER_2] = GAME_PTS[GAME_PTS.length - 1];
      } else {
        this.score[player] = GAME_PTS[index + 1];
      }
    } else {
      this.score[player] = GAME_PTS[index + 1];
    }

    return this;
  };

  Tennis.prototype.player1WinsExchange = function() { return this.addPointToPlayer(PLAYER_1); };
  Tennis.prototype.player2WinsExchange = function() { return this.addPointToPlayer(PLAYER_2); };

  Tennis.prototype.player1Score = function() { return this.score[PLAYER_1]; };
  Tennis.prototype.player2Score = function() { return this.score[PLAYER_2]; };

  Tennis.prototype.isLastPoint = function(score) {
    var lastPoint = GAME_PTS[GAME_PTS.length - 1];
    return score === lastPoint;
  };

  Tennis.prototype.isGamePoint = function() {
    return (
      this.isGamePointFor(PLAYER_1) ||
      this.isGamePointFor(PLAYER_2)
    );
  };

  Tennis.prototype.isGamePointFor = function(player) {
    var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

    var score = this['player' + (player + 1) + 'Score']();
    var otherScore = this['player' + (otherPlayer + 1) + 'Score']();

    return (
      score === 'adv' || (
        this.isLastPoint(score) &&
        !this.isLastPoint(otherScore) &&
        otherScore !== 'adv'
      )
    );
  };

  Tennis.prototype.isDeuce = function() {
    return (
      this.isLastPoint(this.player1Score()) &&
      this.isLastPoint(this.player2Score())
    );
  };

  Tennis.prototype.isOver = function() {
    return (
      this.player1Score() === 'win' ||
      this.player2Score() === 'win'
    );
  };

  module.exports.Tennis = Tennis;
}());
