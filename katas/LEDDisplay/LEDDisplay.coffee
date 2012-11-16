exports.LEDDisplay = class LEDDisplay

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

  toLED: (number) ->
    if arguments.length is 0
      return ''
    else
      if number is 0
        return LEDDigits[0]

      if number is 1
        return LEDDigits[1]
