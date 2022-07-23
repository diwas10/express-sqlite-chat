import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { match } from 'node-match-path';
import HttpException from '../utils/http-exception';
import * as httpContext from 'express-http-context';
import UnprotectedRoutes from '../config/auth/unprotected-routes';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

	const isUnProtected = UnprotectedRoutes.find(unprotectedRoute => {
		const { matches } = match(unprotectedRoute, req.path);
		return matches;
	});

	if (isUnProtected) return next();

	passport.authenticate('jwt', { session: false }, (error, user, info) => {
		try {
			if (error || !user) throw new HttpException(401, 'Unauthorized');
			const userInfo = (({ id, username }) => ({ id, username }))(user);
			httpContext.set('user', userInfo);
			next();
		} catch (err) {
			next(err);
		}
	})(req, res, next);
};

export default AuthMiddleware;
