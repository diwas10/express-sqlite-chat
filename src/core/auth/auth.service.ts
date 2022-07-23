import { PrismaClient } from '@prisma/client';
import { UserData } from '../../utils/interface';
import { signToken } from '../../utils/token';
import { compareHash, hashPassword } from '../../utils/bcrypt';
import HttpException from '../../utils/http-exception';

const prisma = new PrismaClient();

class AuthService {
	authToken = async ({ username, password }: Omit<UserData, 'id'>) => {

		const findUser = await prisma.user.findFirst({
			where: { username },
		});

		let user = {
			...(findUser || {}),
			register: false,
		};

		if (user.id) {
			const isPwdCorrect = await compareHash(password, user.password);
			if (!isPwdCorrect) throw new HttpException(401, 'Username or password is Incorrect');
		}

		if (!findUser) {
			const createUser = await prisma.user.create({ data: { username, password: await hashPassword(password) } });
			user = { ...createUser, register: true };
		}

		const token = await signToken({ id: user.id, username: user.username });

		return { ...user, password: undefined, token };
	};
}

export default new AuthService();
