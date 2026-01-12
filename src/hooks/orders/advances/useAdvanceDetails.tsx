import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Advance } from "@/Dashboard/Pages/types";
const fetchAdvanceDetails = async (id = "") => {
  return axiosInstance
    .get<ApiResponse<Advance>>(endpoints.orders.advances.show(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useAdvanceDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const query = useQuery<Advance, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["advance-details", id],
    enabled: !!id,
    queryFn: () => fetchAdvanceDetails(id),
  });

  return {
    ...query,
    data: query?.data,
  };
}; 