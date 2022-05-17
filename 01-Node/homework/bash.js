const commands = require('./commands');

const done = function(output) {
  process.stdout.write(output);
  process.stdout.write('\npropmt >')
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' '); // remueve la nueva línea
  
  var cmd = args.shift()
  if(commands.hasOwnProperty(cmd)) {
    // process.stdout.write(Date());  
    commands[cmd](args, done)
  } else {
    process.stdout.write('command not found')
  }
  
  // process.stdout.write('\nprompt > ');
});