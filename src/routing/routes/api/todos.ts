import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { createTodo } from "@/server/functions/createTodos";
import { getTodos } from "@/server/functions/getTodos";
import { createPostRequestHandlerFromServerFn } from "@/server/lib/serverRouteHelpers";
import { authMiddleware } from "@/server/middlewares/auth";

export const Route = createFileRoute("/api/todos")({
	server: {
		middleware: [authMiddleware],
		handlers: ({ createHandlers }) =>
			createHandlers({
				GET: async () => {
					try {
						return json(await getTodos());
					} catch (err) {
						return json({ error: (err as Error).message }, { status: 401 });
					}
				},
				POST: createPostRequestHandlerFromServerFn(createTodo),
			}),
	},
});
