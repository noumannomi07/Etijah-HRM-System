import endpoints from "@/api/endpoints";
import { AirlineTicket } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface AirlineTicketResponse {
  mine: AirlineTicket[];
  all: AirlineTicket[];
}

const fetchAirlineTickets = async () => {
  const response = await axiosInstance.get(endpoints.orders.airlineTickets.all);
  return response.data;
};

export const useAirlineTickets = (filter: 'mine' | 'all' = 'all') => {
  const query = useQuery<AirlineTicketResponse, Error>({
    staleTime: 15 * 60 * 1000, // 15 minutes
    queryKey: ["airline-tickets", filter],
    queryFn: fetchAirlineTickets
  });

  return {
    ...query,
    data: filter === 'mine' ? query?.data?.mine || [] : query?.data?.all || [],
  };
}; 