import { postToApi } from "@/fetchUtils";
import { Table } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateTable = ({
  onSuccess,
  onError,
}: {
  onSuccess: (table: Table) => void;
  onError: (error: Error) => void;
}) =>
  useMutation({
    mutationFn: async (name: string) => {
      const table = await postToApi<Table>("tables/create", { name });

      return table;
    },

    onSuccess,
    onError,
  });
