exports.LEDDisplay = class LEDDisplay

  LEDDigits:
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
    # Invalid arguments
    return '' if arguments.length is 0
    throw new Error() if isNaN number

    # Single digit number
    if number < 10
      result = @LEDDigits[number]
    # Multiple digits number
    else

      ###
      digits = (number + '')

      for i in [0..digits.length-1]
        led += concat(digits[i])
      ###

      if number is 10
        result = ' _ ' + '   ' + '\n' +
                 '| |' + '  |' + '\n' +
                 '|_|' + '  |'

      if number is 11
        result = '   ' + '   ' + '\n' +
                 '  |' + '  |' + '\n' +
                 '  |' + '  |'      

    return result



  concat: (digit1, digit2) ->
    result = ''

    splitD1 = digit1.split('\n')
    splitD2 = digit2.split('\n')

    # splitD2[i] will not work if digit had more lines...
    # let's assume all digits are always 3 lines long
    for i in [0...splitD1.length]
      result += splitD1[i] + ' ' + splitD2[i] + '\n'

    result = result.replace(/\n$/, '')

    return result
