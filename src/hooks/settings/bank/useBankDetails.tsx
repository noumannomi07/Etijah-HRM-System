import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";

export interface Bank {
  id: number;
  ar_title: string;
  en_title: string;
  iban: string;
  swift_code: string;
  created_at: string;
  status: number;
}

export const useBankDetails = (id: string) => {
  return useQuery<Bank, Error>({
    queryKey: ["bank", id],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.settings.bank_management.show(id));
      return response.data.data;
    },
  });
}; 