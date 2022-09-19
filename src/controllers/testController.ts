import { Request, Response } from "express";
import testService from "../services/testService";

export async function postTest(req: Request, res: Response) {
	const test = req.body;
	await testService.insertTest(test);
	res.status(201).send("Created!");
}
