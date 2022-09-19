import Joi from "joi";
import { iTest } from "../types/types";

export const testSchema = Joi.object({
	name: Joi.string().required(),
	pdfUrl: Joi.string().uri().required(),
	categoryId: Joi.number().integer().required(),
	disciplineId: Joi.number().integer().required(),
	teacherId: Joi.number().integer().required(),
});
