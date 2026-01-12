import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteLetter = async (id: string) => {
  return axiosInstance
    .delete<ApiResponse<{ success: boolean }>>(endpoints.orders.letters.delete(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useDeleteLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLetter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
    onError: (error) => {
      console.error("Error deleting letter:", error);
    },
  });
}; 