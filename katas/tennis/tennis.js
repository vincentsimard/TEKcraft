(function () {
  'use strict';

  var Tennis = Tennis || {};

  Tennis.Game = function() {
    var PTS = [0, 15, 30, 40];

    var LAST_POINT = PTS.indexOf(40);

    var PLAYER_1 = 0;
    var PLAYER_2 = 1;

    var score = [0,0];

    var addPointTo = function(player) {
      var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

      if (isOver()) { throw new Error(); }

      if (isAdvantageFor(otherPlayer)) {
        // Going back to 40:40
        // Removing the point that is awarded to the player
        score[player]--;
        score[otherPlayer]--;
      }

      score[player]++;

      return this;
    };

    var isGamePoint = function() {
      return isGamePointFor(PLAYER_1) || isGamePointFor(PLAYER_2);
    };

    var isGamePointFor = function(player) {
      var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

      return (
        score[player] >= LAST_POINT &&
        score[player] > score[otherPlayer]
      );
    };

    var isAdvantageFor = function(player) {
      return score[player] > LAST_POINT && !isOver();
    };

    var isDeuce = function() {
      return player1Score() === player2Score() === LAST_POINT;
    };

    var player1WinsExchange = function() { return addPointTo(PLAYER_1); };
    var player2WinsExchange = function() { return addPointTo(PLAYER_2); };

    var player1Score = function() { return score[PLAYER_1]; };
    var player2Score = function() { return score[PLAYER_2]; };

    var isOver = function() {
      var difference = Math.abs(player1Score() - player2Score());

      return (
        difference > 1 &&
        (
          player1Score() > LAST_POINT ||
          player2Score() > LAST_POINT
        )
      );
    };

    var translatePoint = function(index) {
      var difference = Math.abs(player1Score() - player2Score());
      var point = PTS[index];

      if (index > LAST_POINT) {
        point = difference > 1 ? 'win' : 'adv';
      }

      return point;
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
        result = 'game Player ' + (player1Score() > player2Score() ? 1 : 2);
      }

      return result;
    };

    return {
      player1WinsExchange: player1WinsExchange,
      player2WinsExchange: player2WinsExchange,

      player1Score: function() { return translatePoint(player1Score()); },
      player2Score: function() { return translatePoint(player2Score()); },

      isOver: isOver,

      isGamePoint: isGamePoint,
      isGamePointForPlayer1: function() { return isGamePointFor(PLAYER_1); },
      isGamePointForPlayer2: function() { return isGamePointFor(PLAYER_2); },

      score: function() {
        var score = translatePoint(player1Score()) + ', ' + translatePoint(player2Score());
        return translateScore(score);
      }
    };
  };

  module.exports.Tennis = Tennis;
}());
