const fs = require('fs');
const request = require('request');

module.exports = {
    pwd: function(args, done) { done(process.cwd()) },
    date: function() { process.stdout.write(Date())},
    ls: function(args, done) {
        fs.readdir('.', function(err, files) {
            var out = '';
            if (err) throw err;
            files.forEach(function(file) {
            //   process.stdout.write(file.toString() + "\n");
            out += file + '\n'
            })
            // process.stdout.write('\npropmt >');
            done(out)
          });
    },
    echo: function(args, done) {
        done(args.join(' '))
    },
    cat: function(file) {
        fs.readFile(file[0], 'utf8', function(err, data){
            if(err) throw err;
            // process.stdout.write(data)
            // process.stdout.write('\npropmt >')
            done(data)
        })

    },
    head: function(file, done) {
        fs.readFile(file[0], 'utf8', function(err, data){
            if(err) throw err;
            const lines = data.split('\n').slice(0, 9).join('\n')
            // process.stdout.write(lines)
            // process.stdout.write('\npropmt >')
            done(lines)
        })

    },
    tail: function(file, done) {
        fs.readFile(file[0], 'utf8', function(err, data){
            if(err) throw err;
            const lines = data.split('\n').slice(-10).join('\n')
            process.stdout.write(lines)
            process.stdout.write('\npropmt >')
        })

    },
    curl: function(url, done){
        request(url[0], function(err, response, body){
            if(err) throw err;
            // process.stdout.write(body)
            // process.stdout.write('\npropmt >')
            done(body)
        })

    }
}