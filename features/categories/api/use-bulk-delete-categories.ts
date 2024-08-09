import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete-categories"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete-categories"]["$post"]>["json"];

export const useBulkDeleteCategories = () => {
    const queryclient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async (json) => {
        const response = await client.api.categories["bulk-delete-categories"]["$post"]({ json });
        return await response.json();
      },
      onSuccess: () => {
        //manually refetch categories as we passed categories key
        toast.success("Categories deleted successfully");
        queryclient.invalidateQueries({ queryKey: ["categories"] });
        // TODO: Also invalidate summary
      },
      onError: () => {
        toast.error("Failed to delete categories");
      },
      });
      return mutation;

}
