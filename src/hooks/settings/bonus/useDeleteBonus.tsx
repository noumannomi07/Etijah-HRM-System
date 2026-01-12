import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";

export const useDeleteBonus = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await axiosInstance.delete(endpoints.settings.bonus.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bonuses"] });
    },
  });
}; 