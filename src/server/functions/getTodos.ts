import { createServerFn } from "@tanstack/react-start";
import { desc } from "drizzle-orm";
import { db } from "../db";
import { todos } from "../db/schema";

import { authMiddleware } from "../middlewares/auth";

export const getTodos = createServerFn({
	method: "GET",
})
	.middleware([authMiddleware])
	.handler(async () => {
		// await new Promise((resolve) => setTimeout(resolve, 3000));
		return await db.query.todos.findMany({
			orderBy: [desc(todos.createdAt)],
		});
	});
