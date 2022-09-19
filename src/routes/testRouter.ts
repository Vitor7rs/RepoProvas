import { Router } from "express";
import {
	postTest,
	getTestsByDiscipline,
	getTestsByTeachers,
} from "../controllers/testController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { schemaValidator } from "../middlewares/schemaValidator";
import { testSchema } from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/tests", schemaValidator(testSchema), postTest);
testRouter.get("/tests", authMiddleware, getTestsByDiscipline);
testRouter.get("/tests/byteachers", authMiddleware, getTestsByTeachers);

export default testRouter;
