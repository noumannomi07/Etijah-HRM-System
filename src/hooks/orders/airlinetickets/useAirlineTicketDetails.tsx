import endpoints from "@/api/endpoints";
import { AirlineTicket } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchAirlineTicketDetails = async (id = "") => {
  return await axiosInstance
    .get<ApiResponse<AirlineTicket>>(endpoints.orders.airlineTickets.show(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useAirlineTicketDetails = () => {
  const { id } = useParams<{ id?: string }>();
  return useQuery({
    staleTime: 15 * 60 * 1000, // 15 minutes
    queryKey: ["airline-ticket-details", id],
    enabled: !!id,
    queryFn: () => fetchAirlineTicketDetails(id),
  });
}; 