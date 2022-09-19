import { Request, Response } from "express";
import testService from "../services/testService";

export async function postTest(req: Request, res: Response) {
	const test = req.body;
	await testService.insertTest(test);
	return res.status(201).send("Created!");
}

export async function getTestsByDiscipline(req: Request, res: Response) {
	const testsByDiscipline = await testService.getTestsByDiscipline();
	console.log(testsByDiscipline);
	return res.status(200).send(testsByDiscipline);
}

export async function getTestsByTeachers(req: Request, res: Response) {
	const testsByTeachers = await testService.getTestsByTeachers();
	res.status(200).send(testsByTeachers);
}
