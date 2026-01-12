import endpoints from "@/api/endpoints";
import { VacationEntry } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface VacationResponse {
  mine: VacationEntry[];
  all: VacationEntry[];
}

const fetchVacations = async () => {
  const response = await axiosInstance
    .get(endpoints.orders.vacations.all);
  return response.data;
};

export const useVacations = (filter: 'mine' | 'all' = 'all') => {
  const query = useQuery<VacationResponse, Error>({
    staleTime: 15 * 60 * 1000, // 15 minutes
    queryKey: ["vacations", filter],
    queryFn: fetchVacations
  });

  return {
    ...query,
    data: filter === 'mine' ? query?.data?.mine || [] : query?.data?.all || [],
  };
}; 

