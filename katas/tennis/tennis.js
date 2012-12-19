(function () {
  'use strict';

  var GAME_PTS = [0, 15, 30, 40];

  var Tennis = function() {
    this.score = [0,0];
  };

  Tennis.prototype.addPointToPlayer = function(player) {
    var index;

    if (this.isDeuce()) {
      this.score[player] = 'adv';
      return this;
    }

    index = GAME_PTS.indexOf(this.score[player]);
    this.score[player] = GAME_PTS[index + 1];

    return this;
  };

  Tennis.prototype.player1Score = function() { return this.score[0]; };
  Tennis.prototype.player2Score = function() { return this.score[1]; };

  Tennis.prototype.isDeuce = function() {
    return this.player1Score() === 40 && this.player2Score() === 40;
  };

  module.exports.Tennis = Tennis;
}());