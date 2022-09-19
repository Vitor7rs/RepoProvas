import { Router } from "express";
import { postTest } from "../controllers/testController";
import { schemaValidator } from "../middlewares/schemaValidator";
import { testSchema } from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/test", schemaValidator(testSchema), postTest);

export default testRouter;
