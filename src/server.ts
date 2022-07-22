import App from './app';
import chalkLoggerDeclaration from './config/chalk-logger';

const startApp = async () => {
	chalkLoggerDeclaration();
	new App().main();
};

startApp().then(() => {
	logger.primary('*********************************');
	logger.success('******* 🔥 App Started 🔥 *******');
}).catch((err: Error) => {
	logger.error(err.stack);
});
