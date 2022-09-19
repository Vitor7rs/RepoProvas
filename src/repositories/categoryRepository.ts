import { prisma } from "../database/database";

async function getCategoryById(id: number) {
	return prisma.category.findUnique({
		where: { id },
	});
}

const categoryRepository = {
	getCategoryById,
};

export default categoryRepository;
