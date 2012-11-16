chai = require 'chai'
chai.should()

LEDDisplay = require('../LEDDisplay').LEDDisplay

###
._.   ...   ._.   ._.   ...   ._.   ._.   ._.   ._.   ._.
|.|   ..|   ._|   ._|   |_|   |_.   |_.   ..|   |_|   |_|
|_|   ..|   |_.   ._|   ..|   ._|   |_|   ..|   |_|   ..|
###

LEDDigits = 
  0: ' _ \n' +
     '| |\n' +
     '|_|'
  1: '   \n' +
     '  |\n' +
     '  |'
  2: ' _ \n' +
     ' _|\n' +
     '|_ '
  3: ' _ \n' +
     ' _|\n' +
     ' _|'
  4: '   \n' +
     '|_|\n' +
     '  |'
  5: ' _ \n' +
     '|_ \n' +
     ' _|'
  6: ' _ \n' +
     '|_ \n' +
     '|_|'
  7: ' _ \n' +
     '  |\n' +
     '  |'
  8: ' _ \n' +
     '|_|\n' +
     '|_|'
  9: ' _ \n' +
     '|_|\n' +
     '  |'

describe 'LED Display', ->
   it 'should be defined', -> 
    LEDDisplay.should.not.be.undefined

  describe 'toLED', ->
    it 'should be defined', ->
      led = new LEDDisplay()
      led.toLED.should.not.be.undefined

    describe 'with no arguments', ->
      it 'should return an empty string', ->
        led = new LEDDisplay()
        led.toLED().should.equal ''

    describe 'with argument "number" as a single digit', ->
      it 'should return the LED equivalent', ->
        led = new LEDDisplay()
        led.toLED(0).should.equal LEDDigits[0]
        led.toLED(1).should.equal LEDDigits[1]
        return
