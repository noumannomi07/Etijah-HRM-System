import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";

export const useDeleteCut = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await axiosInstance.delete(endpoints.settings.cut.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cuts"] });
    },
  });
}; 