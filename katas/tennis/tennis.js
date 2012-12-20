(function () {
  'use strict';

  var Tennis = Tennis || {};

  var PTS = [0, 15, 30, 40];
  var PLAYER_1 = 0;
  var PLAYER_2 = 1;

  Tennis.Game = function() {
    this.score = [PTS[0],PTS[0]];
  };

  Tennis.Game.prototype.addPointToPlayer = function(player) {
    var score = this.score[player];
    var index = PTS.indexOf(score);

    if (this.isOver()) { throw new Error(); }

    if (this.isDeuce()) {
      this.score[player] = 'adv';
    } else if (this.isGamePoint()) {
      // Win
      if (this.isGamePointFor(player)) {
        this.score[player] = 'win';
      // Back to deuce
      } else if (this.player1Score() === 'adv' || this.player2Score() === 'adv') {
        this.score[PLAYER_1] = PTS[PTS.length - 1];
        this.score[PLAYER_2] = PTS[PTS.length - 1];
      } else {
        this.score[player] = PTS[index + 1];
      }
    } else {
      this.score[player] = PTS[index + 1];
    }

    return this;
  };

  Tennis.Game.prototype.player1WinsExchange = function() { return this.addPointToPlayer(PLAYER_1); };
  Tennis.Game.prototype.player2WinsExchange = function() { return this.addPointToPlayer(PLAYER_2); };

  Tennis.Game.prototype.player1Score = function() { return this.score[PLAYER_1]; };
  Tennis.Game.prototype.player2Score = function() { return this.score[PLAYER_2]; };

  Tennis.Game.prototype.isGamePoint = function() {
    return (
      this.isGamePointFor(PLAYER_1) ||
      this.isGamePointFor(PLAYER_2)
    );
  };

  Tennis.Game.prototype.isGamePointFor = function(player) {
    var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

    var score = this['player' + (player + 1) + 'Score']();
    var otherScore = this['player' + (otherPlayer + 1) + 'Score']();

    return (
      this.isAdvantage(score) || (
        this.isLastPoint(score) &&
        !this.isLastPoint(otherScore) &&
        !this.isAdvantage(otherScore)
      )
    );
  };

  Tennis.Game.prototype.isLastPoint = function(score) {
    var lastPoint = PTS[PTS.length - 1];
    return score === lastPoint;
  };

  Tennis.Game.prototype.isAdvantage = function(score) {
    return score === 'adv';
  };

  Tennis.Game.prototype.isDeuce = function() {
    return (
      this.isLastPoint(this.player1Score()) &&
      this.isLastPoint(this.player2Score())
    );
  };

  Tennis.Game.prototype.isOver = function() {
    return (
      this.player1Score() === 'win' ||
      this.player2Score() === 'win'
    );
  };

  module.exports.Tennis = Tennis;
}());
