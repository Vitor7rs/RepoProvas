import app from "./index";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

console.log(`Database Url: ${process.env.DATABASE_URL}`);

app.listen(PORT, () => {
	console.log(`Server Running on port ${PORT}`);
});
