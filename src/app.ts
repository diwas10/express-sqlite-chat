import express from 'express';
import { Server } from 'http';
import initRoutes from './core/all-routes';
import * as SocketIo from 'socket.io';

class App {
	public app: express.Express;
	public port: number | string;
	public server: Server;
	public env: string;
	public io: SocketIo.Server;

	constructor() {
		this.app = express();
		this.port = process.env.port || 3000;
		this.server = new Server(this.app);
		this.env = process.env.NODE_ENV || 'development';

		initRoutes(this.app);
		this.listen();
		this.initSocket();
	}


	listen(): void {
		this.app.listen(this.port, () => {
			logger.primary('*********************************');
			logger.success(`******* ENVIRONMENT => ${this.env.toUpperCase()} *******`);
			logger.primary('*********************************');
			logger.success(`🚀 Application is listening on port ${this.port}`);
			logger.primary('*********************************');
		});
	}

	initSocket(): void {
		this.io = new SocketIo.Server(this.server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
			},
		});
	}

}

export default App;
