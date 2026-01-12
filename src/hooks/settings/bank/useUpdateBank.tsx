import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Bank } from "./useBankDetails";
import { convertObjectValuesToString } from "@/utils/payload";

export interface UpdateBankInput {
  "en[title]": string;
  "ar[title]": string;
  iban: string;
  swift_code: string;
}

export const useUpdateBank = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Bank, Error, { id: string; data: UpdateBankInput }>({
    mutationFn: async ({ id, data }) => {
      const formattedPayload = convertObjectValuesToString(data);
      return await axiosInstance.put(
        endpoints.settings.bank_management.update(id),
        formattedPayload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      onSuccess?.();
    },
  });
}; 