import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchVacationDetails = async (id = "") => {
  return axiosInstance
    .get<ApiResponse<Vacation>>(endpoints.orders.vacations.show(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useVacationDetails = (id: string) => {
  const query = useQuery<Vacation, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["vacation-details", id],
    enabled: !!id,
    queryFn: () => fetchVacationDetails(id),
  });

  return {
    ...query,
    data: query?.data,
  };
}; 