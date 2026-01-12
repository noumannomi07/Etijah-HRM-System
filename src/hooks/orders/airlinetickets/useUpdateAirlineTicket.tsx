import endpoints from "@/api/endpoints";
import { AirlineTicketFormData } from "@/Dashboard/Pages/Orders/types/AirlineTickets";
import { AirlineTicket } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateAirlineTicket = async (ticketData: AirlineTicketFormData, id: string) => {
  const formData = convertObjectValuesToString(ticketData);

  return axiosInstance
    .put<ApiResponse<AirlineTicket>>(
      endpoints.orders.airlineTickets.update(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      return res.data?.data;
    });
};

export const useUpdateAirlineTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; ticketData: AirlineTicketFormData }) =>
      updateAirlineTicket(variables.ticketData, variables.id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["airline-ticket-details", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["airline-tickets"] });
    },
    onError: (error) => {
      console.error("Error updating airline ticket:", error);
    },
  });
}; 