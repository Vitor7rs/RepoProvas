import { prisma } from "../database/database";
import { iTest } from "../types/types";

async function insertTest(test: iTest) {
	await prisma.test.create({
		data: test,
	});
}

const testRepository = {
	insertTest,
};

export default testRepository;
