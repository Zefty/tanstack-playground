import { createMiddleware, json } from "@tanstack/react-start";
import { auth } from "../auth";
import { UNAUTHORIZED_RESPONSE } from "../responses";

export const authMiddleware = createMiddleware().server(
	async ({ next, context, request }) => {
		const authSession = await auth.api.getSession({
			headers: request.headers,
		});

		if (!authSession) {
			throw UNAUTHORIZED_RESPONSE();
		}

		if (authSession.session.expiresAt < new Date()) {
			throw UNAUTHORIZED_RESPONSE();
		}

		return await next();
	},
);
