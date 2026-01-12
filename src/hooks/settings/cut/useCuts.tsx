import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Cut } from "./useCutDetails";

export const useCuts = () => {
  return useQuery<Cut[]>({
    queryKey: ["cuts"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.settings.cut.all);
      return response.data.data;
    },
  });
}; 