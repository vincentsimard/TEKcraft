exports.LEDDisplay = class LEDDisplay

  toLED: (number) ->
    if arguments.length is 0
      return ''
    else
      return ' _ \n' +
             '| |\n' +
             '|_|'
