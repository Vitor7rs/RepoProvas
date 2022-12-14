import { NextFunction, Request, Response } from "express";

export function errorsMiddleware(
	err: Error | any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log(err);
	if (err.type) {
		return res.status(errorStatusCode(err.type)).send(err.message);
	}

	return res.sendStatus(500);
}

function errorStatusCode(errorType: string) {
	if (errorType === "conflict") return 409;
	if (errorType === "notFound") return 404;
	if (errorType === "unauthorized") return 401;
	if (errorType === "badRequest") return 400;
	return 400;
}
