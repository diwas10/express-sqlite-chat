import { Server } from 'socket.io';

class SocketController {

	public io: Server;

	constructor(io: Server) {
		this.io = io;
		this.initSocketMiddleware();
		this.initSocket();
	}

	initSocketMiddleware(): void {
		this.io.use((socket, next) => {
			console.log(socket.handshake.headers);
		});
	}


	initSocket(): void {
		this.io.on('connection', (socket) => {
			logger.success('********* User Connected ***********');
			socket.on('disconnect', () => {
				logger.error('********* User Disconnected ***********');
			});
		});
	}
}

export default SocketController;
