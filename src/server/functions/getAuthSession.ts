import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "../auth";

export const getAuthSession = createServerFn().handler(async () => {
	const headers = getRequestHeaders();
	return await auth.api.getSession({
		headers,
	});
});
