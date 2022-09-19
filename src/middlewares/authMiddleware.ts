import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "../services/userService";
dotenv.config();

export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authorization = req.headers["authorization"];
	if (!authorization)
		throw { type: "unauthorized", message: "missing authorization header" };

	const token = authorization.replace("Bearer ", "");
	if (!token) {
		throw { type: "unauthorized", message: "missing token" };
	}

	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
			userId: number;
		};
		const user = await userService.findUserById(userId);
		res.locals.user = user;
		next();
		//
	} catch {
		throw { type: "unauthorized", message: "invalid token" };
	}
}
