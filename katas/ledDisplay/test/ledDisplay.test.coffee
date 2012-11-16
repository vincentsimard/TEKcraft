chai = require 'chai'
chai.should()

LEDDisplay = require('../LEDDisplay').LEDDisplay

###
._.   ...   ._.   ._.   ...   ._.   ._.   ._.   ._.   ._.
|.|   ..|   ._|   ._|   |_|   |_.   |_.   ..|   |_|   |_|
|_|   ..|   |_.   ._|   ..|   ._|   |_|   ..|   |_|   ..|
###

describe 'LED Display', ->
   it 'should be defined', -> 
    LEDDisplay.should.not.be.undefined

  describe 'toLED', ->
    it 'should be defined', ->
      led = new LEDDisplay
      led.toLED.should.not.be.undefined

    describe 'with no arguments', ->
      it 'should return an empty string', ->
        led = new LEDDisplay
        led.toLED().should.equal ''

    describe 'with 0', ->
      it 'should return LED 0', ->
        led = new LEDDisplay
        led.toLED(0).should.equal ' _ \n' +
                                  '| |\n' +
                                  '|_|'

    describe 'with 1', ->
      it 'should return LED 1', ->
        led = new LEDDisplay
        led.toLED(1).should.equal '   \n' +
                                  '  |\n' +
                                  '  |'
