import { Router } from "express";
import userRouter from "./userRouter";

const router = Router();

//routes
router.use(userRouter);

export default router;
