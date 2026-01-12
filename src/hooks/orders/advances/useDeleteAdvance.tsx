import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteAdvance = async (id: string) => {
  return axiosInstance
    .delete<ApiResponse<{ success: boolean }>>(endpoints.orders.advances.delete(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useDeleteAdvance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdvance,
    onSuccess: () => {
      // Invalidate and refetch advances list
      queryClient.invalidateQueries({ queryKey: ["advances"] });
    },
    onError: (error) => {
      console.error("Error deleting advance:", error);
    },
  });
}; 