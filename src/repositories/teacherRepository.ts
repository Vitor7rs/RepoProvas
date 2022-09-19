import { prisma } from "../database/database";

async function getTeacherById(id: number) {
	return prisma.teacher.findUnique({
		where: { id },
	});
}

const teacherRepository = {
	getTeacherById,
};

export default teacherRepository;
