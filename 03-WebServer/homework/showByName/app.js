var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor

http.createServer(function(req, res){

    fs.readFile(`./images${req.url}.jpg`, function(err, data){
        if(err){
            res.writeHead(404, {'Content-type' : 'text/plain'})
            res.end('Img not found')
        } else {
            res.writeHead(200, {'Content-type' : 'image/jpeg'})
            res.end(data)
        }
    })

}).listen(3000, '127.0.0.1')