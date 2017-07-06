var express = require('express');
var server = express();

let port = process.env.port || 6565;
server.use(express.static(__dirname + '/src/'));
server.listen(port, '0.0.0.0');
console.log('...listening on port: ' + port);