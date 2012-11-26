chai = require 'chai'
chai.should()

LEDDisplay = require('../LEDDisplay').LEDDisplay

LEDDigits = [
  ' _ \n' +
  '| |\n' +
  '|_|',
  '   \n' +
  '  |\n' +
  '  |',
  ' _ \n' +
  ' _|\n' +
  '|_ ',
  ' _ \n' +
  ' _|\n' +
  ' _|',
  '   \n' +
  '|_|\n' +
  '  |',
  ' _ \n' +
  '|_ \n' +
  ' _|',
  ' _ \n' +
  '|_ \n' +
  '|_|',
  ' _ \n' +
  '  |\n' +
  '  |',
  ' _ \n' +
  '|_|\n' +
  '|_|',
  ' _ \n' +
  '|_|\n' +
  '  |'
]

describe 'LED Display', ->
  led = ''

  beforeEach ->
    led = new LEDDisplay()



  it 'should be defined', -> 
    LEDDisplay.should.not.be.undefined



  describe 'toLED', ->
    it 'should be defined', ->
      led.toLED.should.not.be.undefined

    describe 'with no arguments', ->
      it 'should return an empty string', ->
        led.toLED().should.equal ''

    describe 'with invalid arguments', ->
      it 'should throw an error', ->
        fnInvalid = (-> led.toLED('a'));
        fnInvalid.should.throw Error;

    describe 'with argument "number" as a single digit', ->
      it 'should return the LED equivalent', ->
        for i in [0..9]
          led.toLED(i).should.equal LEDDigits[i]

        return

    describe 'with argument "number" having more than 1 digit', ->
      it 'should concat two digits together', ->
        led.toLED(10).should.equal '     _ ' + '\n' +
                                   '  | | |' + '\n' +
                                   '  | |_|'

        led.toLED(234).should.equal ' _   _     ' + '\n' +
                                    ' _|  _| |_|' + '\n' +
                                    '|_   _|   |'



  describe 'concat', ->
    it 'should be defined', ->
      led.concat.should.not.be.undefined

    it 'should concat two strings with a space between if they do not have carriage return', ->
      led.concat('fizz', 'buzz').should.equal 'fizz buzz'

    it 'should concat each line of text individually with a space between', ->
      led.concat('fizz\nbuzz', 'y\nah').should.equal 'fizz y\n' +
                                                     'buzz ah'

      led.concat('abc\ndef\nghi\njkl', 'mno\nqrs\ntuv\nwxy').should.equal 'abc mno\n' +
                                                                          'def qrs\n' +
                                                                          'ghi tuv\n' +
                                                                          'jkl wxy'
