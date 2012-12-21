(function () {
  'use strict';

  var Tennis = Tennis || {};

  Tennis.Game = function() {
    var PTS = [0, 15, 30, 40];

    var LAST_INDEX = PTS.length - 1;

    var PLAYER_1 = 0;
    var PLAYER_2 = 1;

    var score = [0,0];

    var addPointToPlayer = function(player) {
      var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

      if (isOver()) { throw new Error(); }

      if (isAdvantage(score[otherPlayer])) {
        // Going back to 40:40
        // Removing the point that is awarded to the player
        score[player]--;
        score[otherPlayer]--;
      }

      score[player]++;

      return this;
    };

    var isGamePoint = function() {
      return isGamePointForPlayer1() || isGamePointForPlayer2();
    };

    var isGamePointFor = function(player) {
      var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

      return (
        isAdvantage(score[player]) || (
          isLastIndex(score[player]) &&
          !isLastIndex(score[otherPlayer]) &&
          !isAdvantage(score[otherPlayer])
        )
      );
    };

    var isLastIndex = function(index) {
      return index === LAST_INDEX;
    };

    var isAdvantage = function(index) {
      return index === (LAST_INDEX + 1);
    };

    var isDeuce = function() {
      return (
        isLastIndex(score[PLAYER_1]) &&
        isLastIndex(score[PLAYER_2])
      );
    };

    var player1WinsExchange = function() { return addPointToPlayer(PLAYER_1); };
    var player2WinsExchange = function() { return addPointToPlayer(PLAYER_2); };

    var player1Score = function() { return translatePoint(score[PLAYER_1]); };
    var player2Score = function() { return translatePoint(score[PLAYER_2]); };

    var isGamePointForPlayer1 = function() { return isGamePointFor(PLAYER_1); };
    var isGamePointForPlayer2 = function() { return isGamePointFor(PLAYER_2); };

    var isOver = function() {
      return (
        player1Score() === 'win' ||
        player2Score() === 'win'
      );
    };

    var translatePoint = function(index) {
      var pts = PTS[index];

      if (index > LAST_INDEX) {
        if (Math.abs(score[0] - score[1]) <= 1) {
          pts = 'adv';
        } else {
          pts = 'win';
        }
      }

      return pts;
    };

    var translateScore = function(result) {
      result = result.replace('adv, 40', 'advantage Player 1');
      result = result.replace('40, adv', 'advantage Player 2');

      result = result.replace(/40/g, 'forty');
      result = result.replace(/30/g, 'thirty');
      result = result.replace(/15/g, 'fifteen');
      result = result.replace(/0/g, 'love');

      result = result.replace(/love, love/g, 'love all');
      result = result.replace(/fifteen, fifteen/g, 'fifteen all');
      result = result.replace(/thirty, thirty/g, 'thirty all');

      result = result.replace(/forty, forty/g, 'deuce');

      if (isOver()) {
        result = 'game Player ' + (player1Score() === 'win' ? 1 : 2);
      }

      return result;
    };

    return {
      player1WinsExchange: player1WinsExchange,
      player2WinsExchange: player2WinsExchange,

      player1Score: player1Score,
      player2Score: player2Score,

      isOver: isOver,

      isGamePoint: isGamePoint,
      isGamePointForPlayer1: isGamePointForPlayer1,
      isGamePointForPlayer2: isGamePointForPlayer2,

      score: function() {
        var result = player1Score() + ', ' + player2Score();

        return translateScore(result);
      }
    };
  };

  module.exports.Tennis = Tennis;
}());
