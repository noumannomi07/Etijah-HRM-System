import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";

export interface Standard {
  id: number;
  ar_title: string;
  en_title: string;
  created_at: string;
  status: number;
}

export const useStandardDetails = (id: string) => {
  return useQuery<Standard, Error>({
    queryKey: ["standard", id],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.settings.standard.show(id));
      return response.data.data;
    },
  });
}; 