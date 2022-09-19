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

async function findUserById(id: number) {
	return prisma.user.findUnique({
		where: {
			id,
		},
	});
}

const userRepository = {
	insertUser,
	findUserByEmail,
	findUserById,
};

export default userRepository;
