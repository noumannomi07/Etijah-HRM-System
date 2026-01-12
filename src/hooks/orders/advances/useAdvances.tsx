import endpoints from "@/api/endpoints";
import { Advance } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface AdvanceResponse {
  mine: Advance[];
  all: Advance[];
}

const fetchAdvances = async () => {
  const response = await axiosInstance.get(endpoints.orders.advances.all);
  return response.data;
};

export const useAdvances = (filter: 'mine' | 'all' = 'all') => {
  const query = useQuery<AdvanceResponse, Error>({
    staleTime: 15 * 60 * 1000, // 15 minutes
    queryKey: ["advances", filter],
    queryFn: fetchAdvances
  });

  return {
    ...query,
    data: filter === 'mine' ? query?.data?.mine || [] : query?.data?.all || [],
  };
}; 