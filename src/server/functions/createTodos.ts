import { createServerFn } from "@tanstack/react-start";
import z from "zod/v4";
import { db } from "../db";
import { todos } from "../db/schema";
import { authMiddleware } from "../middlewares/auth";

const todoSchema = z.strictObject({
	title: z.string(),
});

export const createTodo = createServerFn({
	method: "POST",
})
	.inputValidator(todoSchema.parse)
	.middleware([authMiddleware])
	.handler(async ({ data }) => {
		return await db.insert(todos).values({ title: data.title }).returning();
	});
