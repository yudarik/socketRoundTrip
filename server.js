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


function doRoundTrip(client) {

  let interval = setInterval(() => {
    process.nextTick(() => {
      //console.log('sending next message');
      client.emit('message', {text: 'hello world', timestamp: Date.now()});

    });
  }, 300)

}

listenToIncomingMessages = (client) => {
  let serverRequestTS;

  let messageCallBack = (messageBody) => {
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

  client.on('message', messageCallBack);

};
