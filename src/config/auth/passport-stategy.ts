import passportJwt, { StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { UserData } from '../../utils/interface';
import { PrismaClient } from '@prisma/client';
import validateEnv from '../../utils/validate-env';

validateEnv();
const options: StrategyOptions = {
	algorithms: ['HS256'],
	jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.TOKEN_SECRET,
};

const prisma = new PrismaClient();

const JwtStrategy = passportJwt.Strategy;
const PassportStrategy = () => {
	passport.use(new JwtStrategy(options, async (jwt_payload: Omit<UserData, 'password'>, done) => {
		try {
			const user = await prisma.user.findFirstOrThrow({ where: { id: jwt_payload.id } });
			if (user) return done(null, user);
			return done(null, false);
		} catch (err) {
			done(err, false);
		}

	}));
};

export default PassportStrategy;
