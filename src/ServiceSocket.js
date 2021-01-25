import io from 'socket.io-client';

let socket;

export const initSocket = () => {
	socket = io('https://baru2-color-app.herokuapp.com', {
		transports: ['websocket'],
	});

	console.log('Connecting');
	socket.on('connection', () => console.log('Connected!'));
};

export const disconnectSocket = () => {
	console.log('Disconnecting');
	if (socket) socket.disconnect();
};

export const subscribeToColor = (callBack) => {
	if (socket) {
		socket.on('subscribe-to-color', (color) => {
			console.log('color received: ', color);
			callBack(color);
		});
	}
};

export const sendColor = (color) => {
	if (socket) {
		console.log('sendColor works well', color);
		socket.emit('sendColor', color);
	}
};
