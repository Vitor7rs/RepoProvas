import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routes";
import { errorsMiddleware } from "./middlewares/errorsMiddleware";

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorsMiddleware);

export default app;
