import { UserData } from './interface';

// import {users} from "../../index";

interface TokenData extends Omit<UserData, 'password'> {
	iat: number;
}

const token = (userData: Omit<TokenData, 'iat'>) => {
	const payload = { ...userData, iat: Date.now() };
	return Buffer.from(JSON.stringify(payload), 'utf-8');
};

const decodeToken = (token: string): TokenData => {
	const base64 = Buffer.from(token).toString('utf-8');
	let tokenData = null;

	try {
		tokenData = JSON.parse(base64);
	} catch (err) {
		console.log('Decode token Error');
	}

	return tokenData;
};

const validateToken = (token: string) => {
	const tokenData = decodeToken(token);
	return true;
};


export { validateToken, token, decodeToken };
