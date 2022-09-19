import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

import userRepository from "../repositories/userRepository";
import { iUser } from "../types/types";

async function createUser(user: iUser) {
	const existingUser = await userRepository.findUserByEmail(user.email);
	if (existingUser) {
		console.log(existingUser, "User possìvel");
		throw { type: "conflict", message: "Email already registered!" };
	}

	const SALT = 10;
	const hashedPassword = bcrypt.hashSync(user.password, SALT);
	await userRepository.insertUser({ ...user, password: hashedPassword });
}

async function login(user: iUser) {
	const existingUser = await userRepository.findUserByEmail(user.email);
	if (!existingUser) {
		throw { type: "unauthorized", message: "Invalid credentials!" };
	}
	const validPassword = bcrypt.compareSync(
		user.password,
		existingUser.password
	);
	if (!validPassword) {
		throw { type: "unauthorized", message: "Invalid credentials!" };
	}

	const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	return token;
}

const userService = {
	createUser,
	login,
};

export default userService;
