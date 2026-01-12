import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface CreateRequestCommentParams {
  request_id: number | string;
  comment: string;
  type?: string;
}

const createRequestComment = async (params: CreateRequestCommentParams) => {
  return axiosInstance.post(endpoints.orders.comments.create, {
    request_id: params.request_id,
    comment: params.comment,
    type: params.type || "general"
  });
};

export const useRequestComments = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("orders");

  const mutation = useMutation({
    mutationFn: createRequestComment,
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["vacations"] });
      queryClient.invalidateQueries({ queryKey: ["advances"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      queryClient.invalidateQueries({ queryKey: ["airlineTickets"] });
      
      toast.success(t("comments.success", "Comment added successfully"));
    },
    onError: (error: any) => {
      console.error("Error creating request comment:", error);
      toast.error(
        error.response?.data?.message || 
        t("comments.error", "Failed to add comment")
      );
    },
  });

  return {
    createComment: mutation.mutate,
    isCreatingComment: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
