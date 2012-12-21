(function () {
  'use strict';

  var Tennis = Tennis || {};

  Tennis.Game = function() {
    var PTS = [0, 15, 30, 40];
    var PLAYER_1 = 0;
    var PLAYER_2 = 1;

    var score = [PTS[0],PTS[0]];

    var addPointToPlayer = function(player) {
      var index = PTS.indexOf(score[player]);
      var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

      if (isOver()) { throw new Error(); }

      if (isGamePoint()) {
        // Win
        if (isGamePointFor(player)) {
          score[player] = 'win';
        // Back to deuce
        } else if (isAdvantage(score[otherPlayer])) {
          score[otherPlayer] = PTS[PTS.length - 1];
        } else {
          score[player] = PTS[index + 1];
        }
      } else if (isDeuce()) {
        score[player] = 'adv';
      } else {
        score[player] = PTS[index + 1];
      }

      return this;
    };

    var isGamePoint = function() {
      return isGamePointForPlayer1() || isGamePointForPlayer2();
    };

    var isGamePointFor = function(player) {
      var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;
      var score1 = score[player];
      var score2 = score[otherPlayer];

      return (
        isAdvantage(score1) || (
          isLastPoint(score1) &&
          !isLastPoint(score2) &&
          !isAdvantage(score2)
        )
      );
    };

    var isLastPoint = function(playerScore) {
      var lastPoint = PTS[PTS.length - 1];
      return playerScore === lastPoint;
    };

    var isAdvantage = function(playerScore) {
      return playerScore === 'adv';
    };

    var isDeuce = function() {
      return (
        isLastPoint(score[PLAYER_1]) &&
        isLastPoint(score[PLAYER_2])
      );
    };

    var player1WinsExchange = function() { return addPointToPlayer(PLAYER_1); };
    var player2WinsExchange = function() { return addPointToPlayer(PLAYER_2); };

    var player1Score = function() { return score[PLAYER_1]; };
    var player2Score = function() { return score[PLAYER_2]; };

    var isGamePointForPlayer1 = function() { return isGamePointFor(PLAYER_1); };
    var isGamePointForPlayer2 = function() { return isGamePointFor(PLAYER_2); };

    var isOver = function() {
      return (
        player1Score() === 'win' ||
        player2Score() === 'win'
      );
    };

    return {
      player1WinsExchange: player1WinsExchange,
      player2WinsExchange: player2WinsExchange,

      player1Score: player1Score,
      player2Score: player2Score,

      isOver: isOver,

      isGamePoint: isGamePoint,
      isGamePointForPlayer1: isGamePointForPlayer1,
      isGamePointForPlayer2: isGamePointForPlayer2
    };
  };

  module.exports.Tennis = Tennis;
}());
