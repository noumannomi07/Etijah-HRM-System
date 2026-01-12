import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";

export interface Cut {
  id: number;
  title: string;
  en_title: string;
  ar_title: string;
  status: number;
  updated_at: string;
}

export const useCutDetails = (id: string) => {
  return useQuery<Cut>({
    queryKey: ["cut", id],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.settings.cut.show(id));
      return response.data.data;
    },
  });
}; 