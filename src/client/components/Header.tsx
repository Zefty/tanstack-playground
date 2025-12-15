import { Link, type LinkProps, useLocation } from "@tanstack/react-router";
import { cn } from "../lib/utils";

export default function Header() {
	const pathname = useLocation({
		select: (location) => location.pathname,
	});
	return (
		<header className="p-4 flex items-center bg-gray-800 text-white shadow-lg gap-12">
			<h1 className="ml-4 text-xl font-semibold">
				<Link to="/">
					<img
						src="/tanstack-word-logo-white.svg"
						alt="TanStack Logo"
						className="h-10"
					/>
				</Link>
			</h1>
			<nav className="flex gap-6">
				<NavLink to="/login">Home</NavLink>
				<NavLink to="/my-todos">My Todos</NavLink>
			</nav>
		</header>
	);
}

function NavLink(props: LinkProps) {
	const pathname = useLocation({
		select: (location) => location.pathname,
	});
	return (
		<Link
			to={props.to}
			className={cn(pathname === props.to && "font-bold border-b-2")}
		>
			{props.children}
		</Link>
	);
}
