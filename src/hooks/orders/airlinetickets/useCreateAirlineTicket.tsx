import endpoints from "@/api/endpoints";
import { AirlineTicket } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import { AirlineTicketFormData } from "@/Dashboard/Pages/Orders/types/AirlineTickets";

const createAirlineTicket = async (ticketData: AirlineTicketFormData) => {
  const formData = convertObjectValuesToString(ticketData);

  return axiosInstance
    .post<ApiResponse<AirlineTicket>>(
      endpoints.orders.airlineTickets.create,
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

export const useCreateAirlineTicket = (
  options?: UseMutationOptions<AirlineTicket, unknown, AirlineTicketFormData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAirlineTicket,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["airline-tickets"] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Error creating airline ticket:", error);
      options?.onError?.(error, variables, context);
    },
  });
}; 