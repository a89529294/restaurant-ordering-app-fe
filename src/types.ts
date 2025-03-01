import { QueryClient } from "@tanstack/react-query";

export type MyRouterContext = {
  queryClient: QueryClient;
};

export type Restaurant = {
  id: string;
  name: string;
  email: string;
};

export type Table = {
  id: string;
  qrCodeUrl: string;
  restaurantId: string;
  name: string;
};
