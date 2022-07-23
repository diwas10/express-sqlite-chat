import { Request, Response } from 'express';
import authService from './auth.service';
import HttpException from '../../utils/http-exception';
import { SuccessRes } from '../../utils/response';

class AuthController {
	authToken = async (req: Request, res: Response) => {
		const { username, password } = req.body || {};
		if (!username || !password) throw new HttpException(422, 'Both Password and Username is Required');

		const data = await authService.authToken({ username, password });

		return SuccessRes(res, 200, {
			data: { ...data, register: undefined },
			message: `${data.register ? 'Registered' : 'Logged in'} Successfully`,
		});
	};
}

export default new AuthController();
