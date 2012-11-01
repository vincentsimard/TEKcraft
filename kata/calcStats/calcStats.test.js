require('./calcStats.js');

assert = require('assert');



function isDefined(obj) {
  return typeof obj !== 'undefined';
}



(function suite_calcStats() {
  (function calcStatsIsDefined() {
    assert.equal(isDefined(calcStats), true);
  })();

  (function calcStatsFunctionsAreDefined() {
    assert.equal(isDefined(new calcStats().min), true);
    assert.equal(isDefined(new calcStats().max), true);
    assert.equal(isDefined(new calcStats().count), true);
    assert.equal(isDefined(new calcStats().avg), true);
  })();

  (function shouldThrowErrorIfArgumentsAreNotANumber() {
    assert.throws(function() { new calcStats('a'); }, TypeError);
    assert.throws(function() { new calcStats(1, 'b'); }, TypeError);
    assert.doesNotThrow(function() { new calcStats(1); });
  })();



  (function suite_calcStats_min() {
    (function shouldReturnUndefinedWhenNoArguments() {
      assert.equal(typeof new calcStats().min(), 'undefined');
    })();

    (function shouldReturnArgumentValueIfThereIsOnlyOneArgument() {
      assert.equal(new calcStats(1).min(), 1);
    })();

    (function shouldReturnSmallestValueIfArgumentsLengthIsMoreThanOne() {
      assert.equal(new calcStats(5,3,9,6,974).min(), 3);
      assert.equal(new calcStats(7,20,-3,31,92,0).min(), -3);
    })();
  })();



  (function suite_calcStats_max() {
    (function shouldReturnUndefinedWhenNoArguments() {
      assert.equal(typeof new calcStats().max(), 'undefined');
    })();

    (function shouldReturnArgumentValueIfThereIsOnlyOneArgument() {
      assert.equal(new calcStats(1).max(), 1);
    })();

    (function shouldReturnLargestValueIfArgumentsLengthIsMoreThanOne() {
      assert.equal(new calcStats(5,3,9,6,974).max(), 974);
      assert.equal(new calcStats(7,20,-3,-102,31,92,0).max(), 92);
    })();
  })();



  (function suite_calcStats_count() {
    (function shouldReturnZeroWhenNoArguments() {
      assert.equal(new calcStats().count(), 0);
    })();

    (function shouldReturnTheNumberOfArgumentsWhenArgumentsArePassed() {
      assert.equal(new calcStats(42).count(), 1);
      assert.equal(new calcStats(66,99).count(), 2);
      assert.equal(new calcStats(1,2,3,4,5,6,7,8,9).count(), 9);
    })();
  })();



  (function suite_calcStats_avg() {
    (function shouldReturnUndefinedIfNoArguments() {
      assert.equal(typeof new calcStats().avg(), 'undefined');
    })();

    (function shouldReturnArgumentValueIfThereIsOnlyOneArgument() {
      assert.equal(new calcStats(1).avg(), 1);
      assert.equal(new calcStats(99).avg(), 99);
    })();

    (function shouldReturnSumOfArgumentsDividedByCountIfThereIsMoreThanOneArgument() {
      assert.equal(new calcStats(0, 2).avg(), 1);
    })();
  })();
})();

console.log('All tests passed');