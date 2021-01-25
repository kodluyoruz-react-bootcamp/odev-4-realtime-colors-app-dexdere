const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const Port = process.env.path || 3000;

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

http.listen(Port, () => {
	console.log(`listening on : ${Port}`);
});
