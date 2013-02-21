(function() {
  'use strict';

  var calendar = function() {
    if (arguments.length === 0) { return []; }

    return [{
      left: 0,
      top: 60,
      width: 600,
      height: 60
    }];
  };

  module.exports.calendar = calendar;
}());