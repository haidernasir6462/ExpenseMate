import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<typeof client.api.transactions.$post>["json"];

export const usePostCreateTransaction = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      //manually refetch transaction as we passed transaction key
      toast.success("Transaction created successfully");
      queryclient.invalidateQueries({ queryKey: ["transaction"] });
    },
    onError: () => {
      toast.error("Transaction Creation failed");
    },
  });
  return mutation;
};
