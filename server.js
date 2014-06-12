var fs = require("fs")

var WebSocketServer = require('websocket').server;
var http = require('http');
var index = fs.readFileSync("index.html", "utf8")

var server = http.createServer(function(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.write(index);
  response.end();
});

var port = process.env.PORT || "3000"

server.listen(port, function() {
  console.log((new Date()) + ' Server is listening on port ' + port);
});

wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

var counter = 0

wsServer.on('request', function(request) {
  var connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      counter++
      connection.sendUTF("" + counter + ": " + message.utf8Data);
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
