import { createFileRoute } from "@tanstack/react-router";
import { CircleCheck, CircleX } from "lucide-react";
import { useAuthHandlers } from "@/client/hooks/useAuthHandlers";
import { cn } from "@/client/lib/utils";

export const Route = createFileRoute("/(app)/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const routeContext = Route.useRouteContext();

	const {
		alert,
		signInAction,
		isSignInPending,
		signUpAction,
		isSignUpPending,
		signOutAction,
		isSignOutPending,
	} = useAuthHandlers();

	const isPending = isSignInPending || isSignUpPending;

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl mt-24">
				Demo Login Page{" "}
				{routeContext.user && `- Welcome ${routeContext.user?.name}`}
			</h1>
			<form className="flex flex-col gap-2 w-xl mt-24">
				{alert && (
					<div
						className={cn(
							"p-2 rounded-sm text-gray-600 flex gap-2",
							alert.type === "success" ? "bg-green-500/25" : "bg-red-500/25",
						)}
					>
						{alert.type === "success" ? <CircleCheck /> : <CircleX />}
						{alert.message}
					</div>
				)}
				{!routeContext.session && (
					<>
						<input
							name="email"
							type="text"
							placeholder="Email"
							className="border rounded-md p-2"
						/>
						<input
							name="password"
							type="password"
							placeholder="Password"
							className="border rounded-md p-2"
						/>
						<button
							type="submit"
							className="border rounded-md p-2 self-start w-24 disabled:text-gray-400"
							disabled={isPending}
							formAction={signInAction}
						>
							Sign In
						</button>
						<button
							type="submit"
							className="border rounded-md p-2 self-start w-24 disabled:text-gray-400"
							disabled={isPending}
							formAction={signUpAction}
						>
							Sign Up
						</button>
					</>
				)}
				{routeContext.session && (
					<button
						type="submit"
						className="border rounded-md p-2 self-end w-24 disabled:text-gray-400"
						disabled={isSignOutPending}
						formAction={signOutAction}
					>
						Sign Out
					</button>
				)}
			</form>
		</div>
	);
}
