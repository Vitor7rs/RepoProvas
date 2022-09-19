import { User, Test } from "@prisma/client";

export type iUser = Omit<User, "id">;

export type iTest = Omit<Test, "id">;

export type iCreateTest = Omit<Test, "id" | "teacherDisciplineId"> & {
	teacherId: number;
	disciplineId: number;
};
