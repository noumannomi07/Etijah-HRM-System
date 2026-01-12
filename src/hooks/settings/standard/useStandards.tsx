import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Standard } from "./useStandardDetails";

export const useStandards = () => {
  return useQuery<Standard[], Error>({
    queryKey: ["standards"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.settings.standard.all);
      return response.data.data;
    },
  });
}; 