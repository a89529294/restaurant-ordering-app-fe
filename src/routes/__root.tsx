import { Toaster } from "@/components/ui/sonner";
import { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ApiError } from "../fetchUtils";
import { getCurrentRestaurantQueryOptions } from "../queries/getCurrentRestaurant";
import { CircleAlert } from "lucide-react";

type MyRouterContext = {
	queryClient: QueryClient;
};

const getCurrentRestaurantFromCacheOrApi = async (context: MyRouterContext) => {
	try {
		const foundRestaurant = await context.queryClient.ensureQueryData(
			getCurrentRestaurantQueryOptions()
		);

		return foundRestaurant;
	} catch (error) {
		if (error instanceof ApiError && error.code === "NOT_FOUND") return null;

		throw error;
	}
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async ({ location, context }) => {
		const restaurant = await getCurrentRestaurantFromCacheOrApi(context);

		if (!restaurant) {
			if (
				!location.pathname.startsWith("/login") &&
				!location.pathname.startsWith("/signup")
			)
				throw redirect({ to: "/login" });
		}

		if (
			restaurant &&
			(location.pathname.startsWith("/login") ||
				location.pathname.startsWith("/signup") ||
				location.pathname === "/")
		)
			throw redirect({ to: "/dashboard" });
	},
	component: RootLayout,
	errorComponent: () => {
		return (
			<>
				無法取得餐廳資訊
				<Outlet />
				<TanStackRouterDevtools />
			</>
		);
	},
});

function RootLayout() {
	return (
		<>
			<Outlet />
			<TanStackRouterDevtools />
			<Toaster icons={{ error: <CircleAlert color="red" /> }} />
		</>
	);
}
