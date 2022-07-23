import { cleanEnv, port, str } from 'envalid';
import dotenv from 'dotenv';

const validateEnv = () => {
	dotenv.config({ path: `${__dirname}/../../.env.${process.env.NODE_ENV}` });
	cleanEnv(process.env, {
		NODE_ENV: str(),
		PORT: port(),
		DATABASE_URL: str(),
		TOKEN_SECRET: str(),
		TOKEN_EXPIRY: str(),
	});
};

export default validateEnv;
