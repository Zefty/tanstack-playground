import { useRouteContext, useRouter } from "@tanstack/react-router";
import { useActionState, useState } from "react";
import { authClient } from "../lib/authClient";

export function useAuthHandlers() {
	const router = useRouter();
	const routerContext = useRouteContext({
		from: "__root__",
	});
	const [alert, setAlert] = useState<{ type: string; message: string }>();

	const handleSignIn = async (_previousState: boolean, formData: FormData) => {
		const { data, error } = await authClient.signIn.email({
			email: formData.get("email")?.toString() || "",
			password: formData.get("password")?.toString() || "",
			rememberMe: true,
		});

		routerContext.queryClient.resetQueries({
			queryKey: ["getAuthSession"],
		});
		await router.invalidate();

		if (error) {
			setAlert({
				type: "error",
				message: error.message ?? error.statusText,
			});
			return false;
		}

		setAlert({
			type: "success",
			message: "Signed in successfully!",
		});

		return true;
	};

	const handleSignUp = async (_previousState: boolean, formData: FormData) => {
		const { data, error } = await authClient.signUp.email({
			email: formData.get("email")?.toString() || "",
			password: formData.get("password")?.toString() || "",
			name: formData.get("email")?.toString().split("@")[0] ?? "",
		});

		if (error) {
			setAlert({
				type: "error",
				message: error.message ?? error.statusText,
			});
			return false;
		}

		setAlert({
			type: "success",
			message: "Signed up successfully!",
		});

		return true;
	};

	const handleSignOut = async (_previousState: boolean) => {
		const { data, error } = await authClient.signOut();

		routerContext.queryClient.resetQueries({
			queryKey: ["getAuthSession"],
		});
		await router.invalidate();

		if (error || !data.success) {
			setAlert({
				type: "error",
				message:
					error?.message ??
					error?.statusText ??
					"Failed to sign out, please try again!",
			});
			return false;
		}

		setAlert({
			type: "success",
			message: "Signed out successfully!",
		});
		return true;
	};

	const [signInState, signInAction, isSignInPending] = useActionState(
		handleSignIn,
		false,
	);

	const [signUpState, signUpAction, isSignUpPending] = useActionState(
		handleSignUp,
		false,
	);

	const [signOutState, signOutAction, isSignOutPending] = useActionState(
		handleSignOut,
		false,
	);

	return {
		alert,
		signInState,
		signInAction,
		isSignInPending,
		signUpState,
		signUpAction,
		isSignUpPending,
		signOutState,
		signOutAction,
		isSignOutPending,
	};
}
