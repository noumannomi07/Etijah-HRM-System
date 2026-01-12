import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Bank } from "./useBankDetails";

export const useBanks = () => {
  return useQuery<Bank[], Error>({
    queryKey: ["banks"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.settings.bank_management.all);
      return response.data.data;
    },
  });
};
