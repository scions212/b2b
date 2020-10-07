var app = require('expres');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var socket = io('http://localhost:3700');

app.get('/chat', (req, res) => res.send('hello!'));

		io.on ('conexión', (socket) => { 
			console.log ('un usuario conectado'); 
			socket.on('message', (msg) => {
			  console.log(msg);
			  socket.broadcast.emit('message-broadcast', msg);
			 });
		  });
		