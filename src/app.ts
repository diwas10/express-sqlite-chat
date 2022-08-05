import express from 'express';
import { Server } from 'http';
import initRoutes from './core/all-routes';
import * as SocketIo from 'socket.io';
import ErrorMiddleware from './middlewares/error.middleware';
import RouteMiddleware from './middlewares/route.middleware';
import PassportStrategy from './config/auth/passport-stategy';
import AuthMiddleware from './middlewares/auth.middleware';
import cors from 'cors';
import corsOptions from './config/cors';
import morgan from 'morgan';
import SocketController from './core/Socket/socket.controller';

class App {
	public app: express.Express;
	public port: number | string;
	public server: Server;
	public env: string;
	public io: SocketIo.Server;

	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = new Server(this.app);
		this.env = process.env.NODE_ENV || 'development';

		this.init();
		this.listen();
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

	init(): void {
		PassportStrategy();
		new SocketController(this.server);

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors(corsOptions));
		this.app.use(morgan('dev'));
		this.app.use(AuthMiddleware);

		initRoutes(this.app);

		this.app.use(RouteMiddleware);
		this.app.use(ErrorMiddleware);
	}
}

export default App;
