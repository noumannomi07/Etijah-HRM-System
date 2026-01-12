import { useMutation, useQueryClient } from "@tanstack/react-query";
import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";

export const useDeletePayrollTransaction = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(
        endpoints.payroll.transactions.delete(id)
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payroll-transactions"] });
    },
    ...options
  });
}; 