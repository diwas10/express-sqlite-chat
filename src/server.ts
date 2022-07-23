import App from './app';
import chalkLoggerDeclaration from './config/chalk-logger';

const startApp = async () => {
	chalkLoggerDeclaration();
	new App();
};

startApp().then(() => {
	logger.success('******* 🔥 App Started 🔥 *******');
	logger.primary('*********************************');
}).catch((err: Error) => {
	logger.error(err.stack);
});
