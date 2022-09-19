import { Router } from "express";
import { login, signUp } from "../controllers/userController";
import { schemaValidator } from "../middlewares/schemaValidator";
import { userSchema } from "../schemas/userSchema";

const userRouter = Router();

userRouter.post("/login", schemaValidator(userSchema), login);
userRouter.post("/signup", schemaValidator(userSchema), signUp);

export default userRouter;
