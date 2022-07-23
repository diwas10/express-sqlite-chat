import 'express-async-errors';
import { NextFunction, Request, Response } from 'express';
import { ErrorRes } from '../utils/response';
import HttpException from '../utils/http-exception';

const ErrorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
	if (!err) return next();

	logger.error(err.stack, err.name, err.message);
	logger.error('****************************** ASYNC ERRORS ******************************');
	logger.error('req.originalUrl =====> ', req.get('Host'), req.originalUrl);

	if (!res.headersSent) return ErrorRes(res, err.status || 500, { message: err.message });
};

export default ErrorMiddleware;
