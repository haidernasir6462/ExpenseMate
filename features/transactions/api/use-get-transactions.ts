import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await client.api.transactions.$get();
      if (!response.ok) {
        throw new Error("failed to fetch transactions");
      }

      const {data}  = await response.json();
      return data;
    },
  });
  return query;
};
