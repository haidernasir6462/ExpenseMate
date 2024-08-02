import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)["update-transaction"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)["update-transaction"]["$post"]
>["json"];

export const useUpdateTransaction = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["update-transaction"][
        "$post"
      ]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      //manually refetch transactions as we passed transactions key
      toast.success("Transaction updated successfully");
      queryclient.invalidateQueries({ queryKey: ["transactions"] });
      // TODO: Also invalidate summary
    },
    onError: () => {
      toast.error("Failed to update transactions");
    },
  });
  return mutation;
};
