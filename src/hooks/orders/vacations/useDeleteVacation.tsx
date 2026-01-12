import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteVacation = async (id: string) => {
  const response = await axiosInstance
    .delete<ApiResponse<{ success: boolean }>>(endpoints.orders.vacations.delete(id))
    .then((res) => {
      return res.data?.data;
    });
  return response;
};

export const useDeleteVacation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVacation,
    onSuccess: () => {
      // Invalidate and refetch vacations list
      queryClient.invalidateQueries({ queryKey: ["vacations"] });
    },
    onError: (error) => {
      console.error("Error deleting vacation:", error);
    },
  });
}; 