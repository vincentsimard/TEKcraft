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
    led = ''

    if arguments.length is 0
      led = ''
    else if number < 10
      led = LEDDigits[number]
    else
      led = ' _ ' + '   ' + '\n' +
            '| |' + '  |' + '\n' +
            '|_|' + '  |'

    return led
