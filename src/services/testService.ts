import categoryRepository from "../repositories/categoryRepository";
import disciplineRepository from "../repositories/disciplineRepository";
import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository";
import teacherRepository from "../repositories/teacherRepository";
import testRepository from "../repositories/testRepository";
import { iCreateTest } from "../types/types";

async function insertTest(test: iCreateTest) {
	const { categoryId, teacherId, disciplineId, name, pdfUrl } = test;
	const existingCategory = await categoryRepository.getCategoryById(categoryId);
	if (!existingCategory) {
		throw { type: "badRequest", message: "non-existent category!" };
	}

	const existentDiscipline = await disciplineRepository.getDisciplineById(
		disciplineId
	);
	if (!existentDiscipline) {
		throw { type: "badRequest", message: "non-existing discipline" };
	}

	const existentTeacher = await teacherRepository.getTeacherById(teacherId);
	if (!existentTeacher) {
		throw { type: "badRequest", message: "non-existing teacher" };
	}

	const teacherDisciplineId =
		await teacherDisciplineRepository.getTeacherAndDisciplineById(
			teacherId,
			disciplineId
		);
	if (!teacherDisciplineId) {
		throw {
			type: "badRequest",
			message: "the teacher does not teach this subject",
		};
	}

	await testRepository.insertTest({
		teacherDisciplineId: teacherDisciplineId.id,
		name: name,
		pdfUrl: pdfUrl,
		categoryId: categoryId,
	});
}

const testService = {
	insertTest,
};

export default testService;
