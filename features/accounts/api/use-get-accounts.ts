import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();
      if (!response) {
        throw new Error("failed to fetch accounts");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};