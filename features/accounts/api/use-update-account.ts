import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)["update-account"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)["update-account"]["$post"]
>["json"];

export const useUpdateAccount = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts["update-account"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      //manually refetch accounts as we passed accounts key
      toast.success("Account updated successfully");
      queryclient.invalidateQueries({ queryKey: ["accounts"] });
      // TODO: Also invalidate summary
    },
    onError: () => {
      toast.error("Failed to update accounts");
    },
  });
  return mutation;
};
