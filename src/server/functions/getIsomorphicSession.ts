import type { QueryClient } from "@tanstack/react-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getAuthSession } from "@/server/functions/getAuthSession";

export const getIsomorphicSession = createIsomorphicFn()
	.client(async (queryClient: QueryClient) => {
		const session = await queryClient.ensureQueryData({
			queryFn: async () => await getAuthSession(),
			queryKey: ["getAuthSession"],
			gcTime: Infinity,
		});

		return {
			session: session?.session,
			user: session?.user,
		};
	})
	.server(async () => {
		const session = await getAuthSession();

		return {
			session: session?.session,
			user: session?.user,
		};
	});