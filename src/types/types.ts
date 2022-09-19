import { User } from "@prisma/client";

export type iUser = Omit<User, "id">;

export type iUserCreate = Partial<User>;
