import { QueryClient } from "@tanstack/react-query";
import { createRouter, Link } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { getAuthSession } from "@/server/functions/getAuthSession";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 60 * 1000,
			},
		},
	});

	const router = createRouter({
		routeTree,
		context: { queryClient, getAuthSession },
		defaultPreload: "intent",
		scrollRestoration: true,
		defaultErrorComponent: (props) => {
			return (
				<main className="flex flex-col items-center pt-[calc(100%/6)]">
					<h1 className="text-3xl font-bold bg-red-500/25 rounded-md p-2 mb-12">{`${props.error.cause} ${props.error.message}`}</h1>
					<div className="flex gap-6">
						<button
							type="button"
							onClick={() => props.reset()}
							className="border rounded-md p-2 w-24"
						>
							Reload
						</button>
						<Link to="/" className="border rounded-md p-2 w-24 text-center">
							Go Home
						</Link>
					</div>
				</main>
			);
		},
		defaultNotFoundComponent: () => <div>404 - Not Found</div>,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});

	return router;
};
