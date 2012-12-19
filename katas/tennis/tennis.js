(function () {
  'use strict';

  var Tennis = function(player1, player2) {
    if (player1 == undefined){
      player1 = 'player1'
    }
    if (player2 == undefined){
      player2 = 'player2'; 
    }

    this[player1 + 'score'] = 0;
    this[player2 + 'score'] = 0;
  };

  Tennis.prototype.winExchange = function(playerName){
    if (this[playerName + 'score'] === 30) {
      this[playerName + 'score'] += 10;

    } else if (this['player1score'] == 40
      && this['player2score'] == 40) 
    {
      this[playerName + 'score'] = 'advantage';
    }

    else {
      this[playerName + 'score'] += 15;
    }

    return this;
  };

  module.exports.Tennis = Tennis;
}());