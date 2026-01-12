import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteAirlineTicket = async (id: string) => {
  return axiosInstance
    .delete<ApiResponse<null>>(endpoints.orders.airlineTickets.delete(id))
    .then((res) => {
      return res.data;
    });
};

export const useDeleteAirlineTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAirlineTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["airline-tickets"] });
    },
    onError: (error) => {
      console.error("Error deleting airline ticket:", error);
    },
  });
}; 