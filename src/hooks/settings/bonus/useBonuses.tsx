import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Bonus } from "./useBonusDetails";

export const useBonuses = () => {
  return useQuery<Bonus[]>({
    queryKey: ["bonuses"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.settings.bonus.all);
      return response.data.data;
    },
  });
}; 