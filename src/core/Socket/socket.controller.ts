import SocketIo from 'socket.io';
import { Server } from 'http';

class SocketController {
	public static io: SocketIo.Server;
	private readonly instance: SocketController;

	constructor(server: Server) {
		this.initSocketMiddleware();
		SocketController.io = new SocketIo.Server(server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
			},
		});

		if (this.instance) return this.instance;
		this.instance = this;
	}

	initSocketMiddleware(): void {
		SocketController.io.use((socket, next) => {
			console.log(socket.handshake.headers);
		});
	}
}

export default SocketController;
