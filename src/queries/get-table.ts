import { MyRouterContext, Table } from "@/types";
import { fetchJson } from "../fetchUtils";

const tableQueryOptions = (tableId: string) => ({
  queryKey: ["tables", tableId],
  queryFn: async () => {
    const table = await fetchJson<Table>(`tables/${tableId}`);

    return table;
  },
  staleTime: 0,
  gcTime: 1000 * 60 * 5,
  revalidateIfStale: true,
});

export const getTable = async (context: MyRouterContext, tableId: string) => {
  try {
    const table = await context.queryClient.ensureQueryData(
      tableQueryOptions(tableId)
    );

    return table;
  } catch (error) {
    console.log(error);
    return null;
  }
};
