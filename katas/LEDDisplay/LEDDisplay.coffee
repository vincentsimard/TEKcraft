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

    result = ''
    numberS = number + ''
    numberSLen = numberS.length

    # Single digit number
    if numberSLen < 2
      result = @LEDDigits[number]

    # Multiple digits number
    else

      for i in [0...numberSLen]
        result = @concat(result, @toLED(numberS[i]))

    return result



  concat: (digit1, digit2) ->
    result = ''

    splitD1 = digit1.split('\n')
    splitD2 = digit2.split('\n')

    if digit1.length is 0 then return digit2

    for i in [0...splitD2.length]
      result += splitD1[i] + ' ' + splitD2[i] + '\n'

    result = result.replace(/\n$/, '')

    return result
