import { Toaster } from "@/components/ui/sonner";
import { MyRouterContext } from "@/types";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { CircleAlert } from "lucide-react";
import { getRestaurant } from "../queries/get-restaurant";

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ location, context }) => {
    const restaurant = await getRestaurant(context);

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
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster icons={{ error: <CircleAlert color="red" /> }} />
    </>
  );
}
