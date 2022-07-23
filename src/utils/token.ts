import { UserData } from './interface';
import jwt from 'jsonwebtoken';

// import {users} from "../../index";

interface TokenData extends Omit<UserData, 'password'> {
	iat: number;
}

const signToken = async (userData: Omit<TokenData, 'iat'>) => {
	const payload = { ...userData, iat: Date.now() };
	try {
		return await jwt.sign(payload, process.env.TOKEN_SECRET, {
			algorithm: 'HS256',
			expiresIn: process.env.TOKEN_EXPIRE_TIME || '10d',
		});
	} catch (err) {
		logger.error(err);
		return null;
	}
};

const validateToken = async (token: string) => {
	try {
		return await jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (err) {
		logger.error(err);
		return null;
	}
};


export { validateToken, signToken };
