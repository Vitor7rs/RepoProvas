import { object } from "joi";
import supertest from "supertest";
import app from "../src/index";
import { testFactory } from "./factories/testFactory";
import { userFactory } from "./factories/userFactory";

//SignUp
describe("Testa POST /signUp ", () => {
	it("Espera status 201 se o usuario for cadastrado com sucesso", async () => {
		const user = await userFactory();

		const test = await supertest(app).post("/signup").send(user);

		expect(test.status).toBe(201);
	});

	it("Espera status 409 se o usuario ja tiver sido cadastrado antes com email", async () => {
		const user = await userFactory();

		const InsertUserForDuplicate = await supertest(app)
			.post("/signUp")
			.send(user);
		const test = await supertest(app).post("/signup").send(user);

		expect(test.status).toBe(409);
	});
});

//Login
describe("Testa POST /login ", () => {
	it("Espera status 200 se o login for efetuado com sucesso e espera receber um token", async () => {
		const user = await userFactory();

		const insertUser = await supertest(app).post("/signup").send(user);
		const test = await supertest(app).post("/login").send(user);

		expect(test.status).toBe(200);
		expect(test.body).toBeInstanceOf(Object);
	});

	it("Espera status 401 se usuario efetuar login com as credenciais erradas", async () => {
		const user = await userFactory();
		const user2 = await userFactory();

		const insertUser = await supertest(app).post("/signup").send(user);
		const test = await supertest(app).post("/login").send(user2);

		expect(test.status).toBe(401);
	});
});

// Tests
describe("Testa POST /tests ", () => {
	it("Espera status 201 se o teste for criado com sucesso", async () => {
		const testData = await testFactory();

		const test = await supertest(app).post("/tests").send(testData);

		expect(test.status).toBe(201);
	});
});
