import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "./db";

export const auth = betterAuth({
	plugins: [tanstackStartCookies()],
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
			strategy: "jwt", // can be "jwt" or "compact"
			refreshCache: true, // Enable stateless refresh
		},
	},
	account: {
		storeStateStrategy: "cookie",
		storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
	},
});

export type BetterAuthSession = typeof auth.$Infer.Session;
export type SignInEmailResponse = Awaited<
	ReturnType<typeof auth.api.signInEmail>
>;
export type SignUpEmailResponse = Awaited<
	ReturnType<typeof auth.api.signUpEmail>
>;
