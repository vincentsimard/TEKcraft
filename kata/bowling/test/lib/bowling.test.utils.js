'use strict';

var Test = {
  Utils: {
    // I was not able to get assert.throws() working properly
    // I should create a chai plugin instead
    //   or... you know... figure out how assert.throws() works
    catchError: function(fn, args) {
      var errObj = new Error();

      try {
        if (typeof args !== 'undefined') {
          fn(args);
        } else {
          fn();
        }
      } catch(e) {
        errObj = e;
      }

      return errObj;
    }
  }
};

module.exports.TestUtils = Test.Utils;