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

async function getTestsByDiscipline() {
	const testsByDiscipline = await testRepository.getTestsByDiscipline();
	if (!testsByDiscipline) {
		throw { type: "notFound", message: "tests not found" };
	}
	return testsByDiscipline;
}

// async function formatTerms(terms: any) {
// 	return {
// 		id: 1,
// 		number: 1,
// 		disciplines: [
// 			{
// 				id: 1,
// 				name: "HTML e CSS",
// 				termId: 1,
// 				teacherDisciplines: [
// 					{
// 						id: 1,
// 						teacherId: 1,
// 						disciplineId: 1,
// 						teacher: {
// 							id: 1,
// 							name: "Diego Pinho",
// 						},
// 						tests: [
// 							{
// 								id: 1,
// 								name: "test",
// 								pdfUrl: "http://www.google.com",
// 								categoryId: 1,
// 								teacherDisciplineId: 1,
// 								category: {
// 									id: 1,
// 									name: "Projeto",
// 								},
// 							},
// 							{
// 								id: 2,
// 								name: "test",
// 								pdfUrl: "http://www.google.com",
// 								categoryId: 1,
// 								teacherDisciplineId: 1,
// 								category: {
// 									id: 1,
// 									name: "Projeto",
// 								},
// 							},
// 							{
// 								id: 3,
// 								name: "test",
// 								pdfUrl: "http://www.google.com",
// 								categoryId: 3,
// 								teacherDisciplineId: 1,
// 								category: {
// 									id: 3,
// 									name: "Recuperação",
// 								},
// 							},
// 						],
// 					},
// 				],
// 			},
// 			{
// 				id: 4,
// 				name: "Humildade",
// 				termId: 1,
// 				teacherDisciplines: [
// 					{
// 						id: 4,
// 						teacherId: 2,
// 						disciplineId: 4,
// 						teacher: {
// 							id: 2,
// 							name: "Bruna Hamori",
// 						},
// 						tests: [],
// 					},
// 				],
// 			},
// 		],
// 	};
// }

async function getTestsByTeachers() {
	const testsByTeachers = await testRepository.getTestsByTeachers();
	if (!testsByTeachers) {
		throw { type: "notFound", message: "tests not found" };
	}
	return getTestsByTeachers;
}
const testService = {
	insertTest,
	getTestsByDiscipline,
	getTestsByTeachers,
};

export default testService;
