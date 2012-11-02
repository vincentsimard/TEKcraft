(function() {
  'use strict';

  var chai = require('chai');
  var should = chai.should();

  var GameOfLife = require('./../gol').GameOfLife;

  describe('GameOfLife', function() {
    it('should be defined', function() {
      GameOfLife.should.not.be.undefined;
    });

    // describe('step()', function() {
    //   it('should be defined', function() {
    //     GameOfLife.step.should.not.be.undefined;
    //     GameOfLife.step.should.be.a('function');
    //   });
    // });
  });
})();