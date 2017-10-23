let process = require('process');
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.set('views', __dirname + '/www');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/www'));

app.get('/', function(req, res) {
  res.render('index.html');
});

server.listen(process.env.PORT || 8080);

io.on('connection', function(client){

  console.log('Socket connection is now open');

  client.on('disconnect', function(){});

  listenToIncomingMessages(client);
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
