import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_authed")({
	beforeLoad: async ({ context }) => {
		const authSession = context.session;

		if (!authSession) {
			throw new Error("Unauthorized", { cause: 401 });
		}

		if (authSession.expiresAt < new Date()) {
			throw new Error("Unauthorized", { cause: 401 });
		}
	},
});
