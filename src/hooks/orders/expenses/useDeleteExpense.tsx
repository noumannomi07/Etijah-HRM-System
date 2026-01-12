import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteExpense = async (id: string) => {
  return axiosInstance
    .delete<ApiResponse<{ success: boolean }>>(endpoints.orders.expenses.delete(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      // Invalidate and refetch expenses list
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      console.error("Error deleting expense:", error);
    },
  });
}; 