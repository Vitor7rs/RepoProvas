import { faker } from "@faker-js/faker";

export async function userFactory() {
	const password = faker.random.alphaNumeric(7);
	console.log(password);
	return {
		email: faker.internet.email(),
		password: password,
		confirmPassword: password,
	};
}
