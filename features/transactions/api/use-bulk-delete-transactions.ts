import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete-transactions"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete-transactions"]["$post"]>["json"];

export const useDeleteTransactions = () => {
    const queryclient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async (json) => {
        const response = await client.api.transactions["bulk-delete-transactions"]["$post"]({ json });
        return await response.json();
      },
      onSuccess: () => {
        //manually refetch transactions as we passed transactions key
        toast.success("Transaction deleted successfully");
        queryclient.invalidateQueries({ queryKey: ["transactions"] });
        // TODO: Also invalidate summary
      },
      onError: () => {
        toast.error("Failed to delete transactions");
      },
      });
      return mutation;

}
