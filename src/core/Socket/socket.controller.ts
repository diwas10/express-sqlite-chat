import SocketIo from 'socket.io';
import { Server } from 'http';

class Socket {
	public static io: SocketIo.Server;
	private readonly instance: Socket;

	constructor(server: Server) {
		if (this.instance) return this.instance;
		this.init(server);
		this.instance = this;
	}

	init(server: Server): void {
		Socket.io = new SocketIo.Server(server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
			},
		});

		this.initSocketMiddleware();

		Socket.io.on('connection', (socket) => {
			console.log('************** User Connected **************');
		});
	}


	initSocketMiddleware(): void {
		Socket.io.use((socket, next) => {
			console.log(socket.handshake.headers, 'dadasdasdasdasdasdasdas');
		});
	}
}

export default Socket;
