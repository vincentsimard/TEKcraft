(function () {
  'use strict';

  var Tennis = Tennis || {};

  Tennis.Game = function() {
    var PTS = [0, 15, 30, 40];
    var PTS_NAME = ['love', 'fifteen', 'thirty', 'forty'];

    var LAST_POINT = PTS.indexOf(40);

    var PLAYER_1 = 0;
    var PLAYER_2 = 1;

    var score = [0,0];

    var addPointTo = function(player) {
      var otherPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

      if (isOver()) { throw new Error(); }

      if (isAdvantageFor(otherPlayer)) {
        // Going back to 40:40 instead
        // and removing the point that is awarded to the player
        // Note: Could also have kept adding points
        //       and modify the isDeuce function to check that the score for
        //       both players is equal and greater than LAST_POINT
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
        scoreFor(player) >= LAST_POINT &&
        scoreFor(player) > scoreFor(otherPlayer)
      );
    };

    var isAdvantageFor = function(player) {
      return scoreFor(player) > LAST_POINT && !isOver();
    };

    var isDeuce = function() {
      return scoreFor(PLAYER_1) === scoreFor(PLAYER_2) === LAST_POINT;
    };

    var scoreFor = function(player) { return score[player]; };

    var pointLead = function() {
      return Math.abs(scoreFor(PLAYER_1) - scoreFor(PLAYER_2));
    };

    var isOver = function() {
      return (
        pointLead() > 1 &&
        (
          scoreFor(PLAYER_1) > LAST_POINT ||
          scoreFor(PLAYER_2) > LAST_POINT
        )
      );
    };

    var translatePoint = function(index) {
      var point = PTS[index];

      if (index > LAST_POINT) {
        point = pointLead() > 1 ? 'win' : 'adv';
      }

      return point;
    };

    var translateScore = function(result) {
      var re, i, winningPlayer;

      if (isOver()) {
        winningPlayer = scoreFor(PLAYER_1) > scoreFor(PLAYER_2) ? 1 : 2;
        result = 'game Player ' + winningPlayer;
      } else {
        result = result.replace('adv, 40', 'advantage Player 1');
        result = result.replace('40, adv', 'advantage Player 2');

        for (i = PTS.length - 1; i >= 0; i--) {
          re = new RegExp(PTS[i], 'g');
          result = result.replace(re, PTS_NAME[i]);
        }

        // @TODO: There's probably a way to do away with this loop
        //        and just replace the string if it matches the pattern:
        //          [word], [word]
        for (i = PTS.length - 1; i >= 0; i--) {
          re = new RegExp('((' + PTS_NAME[i] + ')(, ){0,1}){2}', 'g');
          result = result.replace(re, PTS_NAME[i] + ' all');
        }

        result = result.replace(/forty all/g, 'deuce');
      }

      return result;
    };

    return {
      player1WinsExchange: function() { return addPointTo(PLAYER_1); },
      player2WinsExchange: function() { return addPointTo(PLAYER_2); },

      player1Score: function() { return translatePoint(scoreFor(PLAYER_1)); },
      player2Score: function() { return translatePoint(scoreFor(PLAYER_2)); },

      isOver: isOver,

      isGamePoint: isGamePoint,
      isGamePointForPlayer1: function() { return isGamePointFor(PLAYER_1); },
      isGamePointForPlayer2: function() { return isGamePointFor(PLAYER_2); },

      score: function() {
        var score = translatePoint(scoreFor(PLAYER_1)) + ', ' + translatePoint(scoreFor(PLAYER_2));
        return translateScore(score);
      }
    };
  };

  module.exports.Tennis = Tennis;
}());
