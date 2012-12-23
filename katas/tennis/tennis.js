(function () {
  'use strict';

  var Tennis = Tennis || {};

  Tennis.Game = function(player1Name, player2Name) {
    var PTS = [0, 15, 30, 40];
    var PTS_NAME = ['love', 'fifteen', 'thirty', 'forty'];

    var LAST_POINT = PTS.indexOf(40);

    var PLAYER_1 = 0;
    var PLAYER_2 = 1;

    var playerNames = [
      typeof player1Name === 'undefined' ? 'Player 1' : player1Name,
      typeof player2Name === 'undefined' ? 'Player 2' : player2Name
    ];

    var score = [0,0];



    var scoreFor = function(player) { return score[player]; };

    var addPointTo = function(player) {
      var opponent = opponentOf(player);

      if (isOver()) { throw new Error(); }

      if (isAdvantageFor(opponent)) {
        // Back to deuce
        // Setting the opponent's score back to 40 and
        // removing the point that is awarded to the player
        // Note: We could also have kept adding points regardless
        //       and modify the isDeuce function to check that the score is tied
        //       and greater than LAST_POINT
        score[player]--;
        score[opponent]--;
      }

      score[player]++;

      return this;
    };

    var isAdvantage = function() {
      return isAdvantageFor(PLAYER_1) || isAdvantageFor(PLAYER_2);
    };

    var isAdvantageFor = function(player) {
      return scoreFor(player) > LAST_POINT && !isOver();
    };

    var isDeuce = function() {
      return isTied() && scoreFor(PLAYER_1) === LAST_POINT;
    };

    var isGamePoint = function() {
      return isGamePointFor(PLAYER_1) || isGamePointFor(PLAYER_2);
    };

    var isGamePointFor = function(player) {
      return (
        scoreFor(player) >= LAST_POINT &&
        scoreFor(player) > scoreFor(opponentOf(player))
      );
    };

    var isOver = function() {
      return pointLead() > 1 && scoreFor(winningPlayer()) > LAST_POINT;
    };

    var isTied = function() { return pointLead() === 0; };

    var opponentOf = function(player) {
      return player === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    };

    var pointLead = function() {
      return Math.abs(scoreFor(PLAYER_1) - scoreFor(PLAYER_2));
    };

    var translateScore = function(score) {
      var point = PTS[score];

      if (score > LAST_POINT) {
        point = pointLead() > 1 ? 'win' : 'adv';
      }

      return point;
    };

    var winningPlayer = function() {
      var player = scoreFor(PLAYER_2) > scoreFor(PLAYER_1) ? PLAYER_2 : PLAYER_1;

      return !isTied() ? player : -1;
    };

    var winningPlayerName = function() {
      return playerNames[winningPlayer()];
    };

    return {
      player1WinsExchange: function() { return addPointTo(PLAYER_1); },
      player2WinsExchange: function() { return addPointTo(PLAYER_2); },

      player1Score: function() { return translateScore(scoreFor(PLAYER_1)); },
      player2Score: function() { return translateScore(scoreFor(PLAYER_2)); },

      isOver: isOver,

      isGamePoint: isGamePoint,
      isGamePointForPlayer1: function() { return isGamePointFor(PLAYER_1); },
      isGamePointForPlayer2: function() { return isGamePointFor(PLAYER_2); },

      score: function() {
        var scorePlayer1 = translateScore(scoreFor(PLAYER_1));
        var scorePlayer2 = translateScore(scoreFor(PLAYER_2));

        var score = scorePlayer1 + ', ' + scorePlayer2;

        var rePoints, reAll;

        if (isDeuce()) { return 'deuce'; }
        if (isOver()) { return 'game ' + winningPlayerName(); }
        if (isAdvantage()) { return 'advantage ' + winningPlayerName(); }
        
        for (var i = PTS.length - 1; i >= 0; i--) {
          // Matches '0', '15', '30', '40' occurences
          rePoints = new RegExp(PTS[i], 'g');

          // Matches 'love, love', 'fifteen, fifteen', etc.
          reAll = new RegExp('((' + PTS_NAME[i] + ')(, ){0,1}){2}', 'g');

          score = score.replace(rePoints, PTS_NAME[i]);
          score = score.replace(reAll, PTS_NAME[i] + ' all');
        }

        return score;
      }
    };
  };

  module.exports.Tennis = Tennis;
}());
