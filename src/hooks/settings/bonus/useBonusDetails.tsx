import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";

export interface Bonus {
  id: number;
  title: string;
  en_title: string;
  ar_title: string;
  status: number;
  updated_at: string;
}

export const useBonusDetails = (id: string) => {
  return useQuery<Bonus>({
    queryKey: ["bonus", id],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.settings.bonus.show(id));
      return response.data.data;
    },
  });
}; 