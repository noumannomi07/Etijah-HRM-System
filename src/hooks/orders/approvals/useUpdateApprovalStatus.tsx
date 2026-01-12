import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateApprovalStatusParams {
  approval_id: string;
  status: string;
  comment?: string;
}

const updateApprovalStatus = async (params: UpdateApprovalStatusParams) => {
  const formattedPayload = new URLSearchParams(params as any);
  return axiosInstance
    .post<ApiResponse<{ success: boolean }>>(
      `${endpoints.orders.approval.all}/status`,
      formattedPayload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => {
      return res.data?.data;
    });
};

export const useUpdateApprovalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApprovalStatus,
    onSuccess: (_, variables) => {
      // Invalidate and refetch specific approval and approvals list
      queryClient.invalidateQueries({ queryKey: ["approval-details", variables.approval_id] });
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
    },
    onError: (error) => {
      console.error("Error updating approval status:", error);
    },
  });
}; 