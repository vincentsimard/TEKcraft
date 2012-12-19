(function () {
  'use strict';

  var GAME_PTS = [0, 15, 30, 40];
  var PLAYER_1 = 0;
  var PLAYER_2 = 1;

  var Tennis = function() {
    this.score = [0,0];
  };

  Tennis.prototype.addPointToPlayer = function(player) {
    var index;

    if (this.isDeuce()) {
      this.score[player] = 'adv';
    } else {
      index = GAME_PTS.indexOf(this.score[player]);
      this.score[player] = GAME_PTS[index + 1];
    }

    return this;
  };

  Tennis.prototype.player1WinsExchange = function() { return this.addPointToPlayer(PLAYER_1); };
  Tennis.prototype.player2WinsExchange = function() { return this.addPointToPlayer(PLAYER_2); };

  Tennis.prototype.player1Score = function() { return this.score[PLAYER_1]; };
  Tennis.prototype.player2Score = function() { return this.score[PLAYER_2]; };

  Tennis.prototype.isDeuce = function() {
    var lastGamePoint = GAME_PTS[GAME_PTS.length - 1];
    return this.player1Score() === lastGamePoint && this.player2Score() === lastGamePoint;
  };

  module.exports.Tennis = Tennis;
}());
