let server = require('http').createServer();
let io = require('socket.io')(server);
let process = require('process');

io.on('connection', function(client){

  console.log('Socket connection is now open');

  client.on('disconnect', function(){});

  listenToIncomingMessages(client);
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});


function listenToIncomingMessages(client) {
  let serverRequestTS;

  let messageCallback = (messageBody) => {
    serverRequestTS = Date.now();

    process.nextTick(sendMessage);

    console.log(`Message received: ${messageBody.text}`);
  };

  let sendMessage = () => {
    client.emit('message', {
      serverRequestTS: serverRequestTS,
      serverResponseTS: Date.now()
    });
  };

  client.on('message', messageCallback);
}
