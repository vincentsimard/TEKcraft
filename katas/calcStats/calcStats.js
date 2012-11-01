// Calc Stats kata from cyber-dojo.com

calcStats = (function() {
  function calcStats() {
    this.setArgs.apply(this, arguments);
  }

  function minMax(fn) {
    if (typeof this.args === 'undefined') { return; }

    if (this.args.length > 0) {
      return Math[fn].apply(Math, this.args);
    }
  }



  calcStats.prototype.setArgs = function() {
    this.args = Array.prototype.slice.call(arguments, 0);
    var argsAreNumbers = this.args.every(function(e) {
      return !isNaN(e);
    });

    if (!argsAreNumbers) { throw new TypeError(); }
  };



  calcStats.prototype.min = function() {
    return minMax.call(this, 'min');
  };



  calcStats.prototype.max = function() {
    return minMax.call(this, 'max');
  };



  calcStats.prototype.count = function() {
    return this.args.length;
  };



  calcStats.prototype.avg = function() {
    if (this.args.length === 0) { return; }

    var sum = this.args.reduce(function(a, b) { return a + b });

    return sum / this.args.length;
  };



  return calcStats;
})();