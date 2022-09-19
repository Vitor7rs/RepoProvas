import { prisma } from "../database/database";

import { iUser } from "../types/types";

async function insertUser(user: iUser) {
	return prisma.user.create({
		data: user,
	});
}

async function findUserByEmail(email: string) {
	console.log(email, "email aqui");
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
}

const userRepository = {
	insertUser,
	findUserByEmail,
};

export default userRepository;
