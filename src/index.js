const express = require('express');
const app = express();
//const io = require('socket');
//brain.js
const brain = require('brain.js');
const data = require('./data.json');

const network =  new brain.recurrent.LSTM();

const trainingData = data.map(item => ({
  input: item.text,
  output: item.category
}));

network.train(trainingData, {
  iterations: 2000
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/view'));

const server = app.listen(3000, () => {
  console.log('server port 3000!');
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.on('chat message', (text) => {
  
      const output = network.run(text);
      console.log(text);
      console.log(output);
      socket.emit('bot reply', output);
    });
});