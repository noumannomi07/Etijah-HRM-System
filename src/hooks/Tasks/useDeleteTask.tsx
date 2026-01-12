import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteTask = async (id: string) => {
  return axiosInstance
    .delete<ApiResponse<{ success: boolean }>>(endpoints.Tasks.delete(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // Invalidate and refetch vacations list
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });
}; 