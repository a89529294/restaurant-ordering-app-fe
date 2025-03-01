import { fetchJson } from "@/fetchUtils";

export type Order = {
  id: string;
  tableId: string;
  items: string[];
  status: "pending" | "completed" | "cancelled";
  time: string;
};

export const getTableOrders = async (tableId: string): Promise<Order[]> => {
  try {
    const orders = await fetchJson<Order[]>(`tables/${tableId}/orders`);
    return orders;
  } catch (error) {
    console.error("Error fetching table orders:", error);
    return [];
  }
};

export const useGetTableOrders = (tableId: string) => {
  return {
    queryKey: ["tables", tableId, "orders"],
    queryFn: async () => {
      return getTableOrders(tableId);
    },
  };
};
