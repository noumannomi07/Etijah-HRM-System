import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Allowance } from "./useAllowanceDetails";

export const useAllowances = () => {
  return useQuery<Allowance[]>({
    queryKey: ["allowances"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.settings.allowance_mangments.all);
      return response.data.data;
    },
  });
}; 