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
    var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

    if (this.isOver()) { throw new Error(); }

    if (this._isDeuce()) {
      this.score[player] = 'adv';
    } else if (this._isGamePoint()) {
      // Win
      if (this._isGamePointFor(player)) {
        this.score[player] = 'win';
      // Back to deuce
      } else if (this._isAdvantage(this.score[otherPlayer])) {
        this.score[otherPlayer] = PTS[PTS.length - 1];
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

  Tennis.Game.prototype.isOver = function() {
    return (
      this.player1Score() === 'win' ||
      this.player2Score() === 'win'
    );
  };

  Tennis.Game.prototype._isGamePoint = function() {
    return (
      this._isGamePointFor(PLAYER_1) ||
      this._isGamePointFor(PLAYER_2)
    );
  };

  Tennis.Game.prototype._isGamePointFor = function(player) {
    var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

    var score = this['player' + (player + 1) + 'Score']();
    var otherScore = this['player' + (otherPlayer + 1) + 'Score']();

    return (
      this._isAdvantage(score) || (
        this._isLastPoint(score) &&
        !this._isLastPoint(otherScore) &&
        !this._isAdvantage(otherScore)
      )
    );
  };

  Tennis.Game.prototype._isLastPoint = function(score) {
    var lastPoint = PTS[PTS.length - 1];
    return score === lastPoint;
  };

  Tennis.Game.prototype._isAdvantage = function(score) {
    return score === 'adv';
  };

  Tennis.Game.prototype._isDeuce = function() {
    return (
      this._isLastPoint(this.score[PLAYER_1]) &&
      this._isLastPoint(this.score[PLAYER_2])
    );
  };

  module.exports.Tennis = Tennis;
}());
