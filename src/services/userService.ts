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

	const dataUser = {
		email: user.email,
		password: hashedPassword,
	};
	await userRepository.insertUser(dataUser);
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

async function findUserById(id: number) {
	const user = await userRepository.findUserById(id);
	if (!user) {
		throw { type: "notFound", message: "user not found" };
	}

	return user;
}

const userService = {
	createUser,
	login,
	findUserById,
};

export default userService;
