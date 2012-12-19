(function () {
  'use strict';

  var Tennis = function() {
    this.player1score = 0;
    this.player2score = 0;
  };

  Tennis.prototype.winExchange = function(playerName) {
    if (this[playerName + 'score'] === 30) {
      this[playerName + 'score'] += 10;
    } else if (this.isDeuce()) {
      this[playerName + 'score'] = 'advantage';
    } else {
      this[playerName + 'score'] += 15;
    }

    return this;
  };

  Tennis.prototype.isDeuce = function() {
    return this['player1score'] == 40 && this['player2score'] == 40;
  };

  module.exports.Tennis = Tennis;
}());