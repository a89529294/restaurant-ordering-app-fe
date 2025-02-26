import { IS_DEV } from "../constants";
import { fetchJson } from "../fetchUtils";
import type { Restaurant } from "../types";

export const getCurrentRestaurantQueryOptions = () => ({
	queryKey: ["restaurant"],
	queryFn: async () => {
		const restaurant = await fetchJson<Restaurant>(
			`auth/get-current-restaurant`
		);

		return restaurant;
	},
	staleTime: IS_DEV ? 0 : 1000 * 60 * 5,
	gcTime: 1000 * 60 * 5,
});
