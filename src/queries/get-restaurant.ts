import { MyRouterContext, Restaurant } from "@/types";
import { IS_DEV } from "../constants";
import { fetchJson } from "../fetchUtils";

const restaurantQueryOptions = () => ({
  queryKey: ["restaurant"],
  queryFn: async () => {
    const restaurant = await fetchJson<Restaurant>(
      `auth/get-current-restaurant`
    );

    return restaurant;
  },
  staleTime: IS_DEV ? 0 : 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
  revalidateIfStale: true,
});

export const getRestaurant = async (context: MyRouterContext) => {
  try {
    const foundRestaurant = await context.queryClient.ensureQueryData(
      restaurantQueryOptions()
    );

    return foundRestaurant;
  } catch (error) {
    console.log(error);
    return null;
  }
};
