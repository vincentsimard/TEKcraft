(function () {
  'use strict';

  var GAME_PTS = [0, 15, 30, 40];
  var PLAYER_1 = 0;
  var PLAYER_2 = 1;

  var Tennis = function() {
    this.score = [0,0];
  };

  Tennis.prototype.addPointToPlayer = function(player) {
    var index = GAME_PTS.indexOf(this.score[player]);

    if (this.isLastPoint(this.score[player])) {
      if (this.isDeuce()) {
        this.score[player] = 'adv';
      } else {
        // @TODO: playerWinsGame();
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

  Tennis.prototype.isDeuce = function() {
    return (
      this.isLastPoint(this.player1Score()) &&
      this.isLastPoint(this.player2Score())
    );
  };

  module.exports.Tennis = Tennis;
}());
