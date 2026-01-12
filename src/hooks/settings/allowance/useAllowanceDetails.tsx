import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";

export interface Allowance {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  status: number;
  created_at: string;
}

export const useAllowanceDetails = (id: string) => {
  return useQuery<Allowance>({
    queryKey: ["allowance", id],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.settings.allowance_mangments.show(id));
      return response.data.data;
    },
  });
}; 