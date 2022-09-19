import { prisma } from "../database/database";

async function getTeacherAndDisciplineById(
	teacherId: number,
	disciplineId: number
) {
	return prisma.teachersDisciplines.findFirst({
		where: { AND: { disciplineId, teacherId } },
	});
}

const teacherDisciplineRepository = {
	getTeacherAndDisciplineById,
};

export default teacherDisciplineRepository;
