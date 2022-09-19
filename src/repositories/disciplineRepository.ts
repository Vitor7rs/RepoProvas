import { prisma } from "../database/database";

async function getDisciplineById(id: number) {
	return prisma.discipline.findUnique({
		where: { id },
	});
}

const disciplineRepository = {
	getDisciplineById,
};

export default disciplineRepository;
