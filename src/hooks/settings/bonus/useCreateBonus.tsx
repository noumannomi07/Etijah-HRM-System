import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Bonus } from "./useBonusDetails";

export interface CreateBonusInput {
  title?: string;
  "en[title]": string;
  "ar[title]": string;
  status?: number;
}

export const useCreateBonus = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Bonus, Error, CreateBonusInput>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(endpoints.settings.bonus.create, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bonuses"] });
      onSuccess?.();
    },
  });
}; 