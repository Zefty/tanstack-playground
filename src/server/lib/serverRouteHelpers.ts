import type { AnyRoute } from "@tanstack/react-router";
import {
	json,
	type OptionalFetcher,
	type RouteMethodHandler,
} from "@tanstack/react-start";
import z from "zod/v4";
import { tryCatch } from "@/core/utils";
import { postRequestValidationMiddleware } from "../middlewares/api";

export function createPostRequestHandlerFromServerFn<
	TMiddlewares,
	TInputValidator,
	TResponse,
	TRegister,
	TParentRoute extends AnyRoute,
	TFullPath extends string,
	TParams,
	TServerMiddlewares,
	TServerContext,
>(
	serverFn: OptionalFetcher<TMiddlewares, TInputValidator, TResponse>,
	middleware = [postRequestValidationMiddleware],
): RouteMethodHandler<
	TRegister,
	TParentRoute,
	TFullPath,
	TParams,
	TServerMiddlewares,
	(typeof middleware)[number],
	TServerContext
> {
	return {
		middleware,
		handler: async ({ context }) => {
			const res = await tryCatch(
				serverFn({
					data: context.body,
				}),
			);

			return json({
				data: res.data,
				error:
					res.error instanceof z.ZodError
						? z.treeifyError(res.error)
						: res.error,
			});
		},
	};
}
