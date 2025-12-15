import { createServerFn, type Method } from "@tanstack/react-start";
import { authMiddleware } from "../middlewares/auth";

export const createProtectedServerFn = <
	TMethod extends Method = "GET",
>(options?: {
	method?: TMethod;
}) => {
	return createServerFn(options).middleware([authMiddleware]);
};

export const useAuth = createServerFn({
	method: "GET",
})
	.middleware([authMiddleware])
	.handler(() => {});
