import { prisma } from "../database/database";
import { iTest } from "../types/types";

async function insertTest(test: iTest) {
	await prisma.test.create({
		data: test,
	});
}

async function getTestsByDiscipline() {
	const tests = await prisma.term.findMany({
		include: {
			disciplines: {
				include: {
					teacherDisciplines: {
						include: {
							teacher: true,
							tests: {
								include: {
									category: true,
								},
							},
						},
					},
				},
			},
		},
	});

	return tests;
}

async function getTestsByTeachers() {
	const tests = await prisma.teachersDisciplines.findMany({
		include: {
			teacher: true,
			discipline: true,
			tests: {
				include: {
					category: true,
				},
			},
		},
	});

	return tests;
}

const testRepository = {
	insertTest,
	getTestsByDiscipline,
	getTestsByTeachers,
};

export default testRepository;
