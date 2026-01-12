import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { Bonus } from "./useBonusDetails";

interface UpdateBonusInput {
  title?: string;
  "ar[title]"?: string;
  "en[title]"?: string;
  status?: number;
}

export const useUpdateBonus = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Bonus, Error, { id: string; data: UpdateBonusInput }>({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.put(endpoints.settings.bonus.update(id), data, {
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