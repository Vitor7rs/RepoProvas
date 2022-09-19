import { Request, Response } from "express";
import userService from "../services/userService";

export async function signUp(req: Request, res: Response) {
	const user = req.body;
	await userService.createUser(user);
	return res.status(201).send("Created!");
}

export async function login(req: Request, res: Response) {
	const user = req.body;
	const token = await userService.login(user);
	return res.status(200).send({ token });
}

const userController = {
	signUp,
	login,
};

export default userController;
