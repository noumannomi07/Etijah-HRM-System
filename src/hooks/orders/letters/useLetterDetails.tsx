import endpoints from "@/api/endpoints";
import { Letter } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchLetterDetails = async (id = "") => {
  return axiosInstance
    .get<ApiResponse<Letter>>(endpoints.orders.letters.show(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useLetterDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const query = useQuery<Letter, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["letter-details", id],
    enabled: !!id,
    queryFn: () => fetchLetterDetails(id),
  });

  return {
    ...query,
    data: query?.data,
  };
}; 