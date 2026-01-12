import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Bank } from "./useBankDetails";

export interface CreateBankInput {
  "en[title]": string;
  "ar[title]": string;
  iban: string;
  swift_code: string;
}

export const useCreateBank = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Bank, Error, CreateBankInput>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(endpoints.settings.bank_management.create, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      onSuccess?.();
    },
  });
}; 