import { createMiddleware } from "@tanstack/react-start";
import { tryCatch } from "@/core/utils";
import { BAD_REQUEST_RESPONSE } from "../responses";

export const postRequestValidationMiddleware = createMiddleware().server(
	async ({ next, context, request }) => {
		const checkRequestBody = await tryCatch<unknown>(request.json());

		if (checkRequestBody.error) {
			throw BAD_REQUEST_RESPONSE(checkRequestBody.error.toString());
		}

		return await next({
			context: {
				body: checkRequestBody.data,
			},
		});
	},
);
