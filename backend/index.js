const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.end('Merhaba Socket.IO');
});

io.on('connection', (socket) => {
	console.log('connected');
	socket.on('sendColor', (color) => {
		console.log(color);
		socket.broadcast.emit('subscribe-to-color', color);
	});
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});
