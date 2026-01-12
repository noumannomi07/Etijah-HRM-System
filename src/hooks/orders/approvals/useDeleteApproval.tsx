import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteApproval = async (id: string) => {
  return axiosInstance
    .delete<ApiResponse<{ success: boolean }>>(endpoints.orders.approval.delete(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useDeleteApproval = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApproval,
    onSuccess: () => {
      // Invalidate and refetch approvals list
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
    },
    onError: (error) => {
      console.error("Error deleting approval:", error);
    },
  });
}; 