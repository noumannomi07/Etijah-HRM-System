import { useMutation, useQueryClient } from "@tanstack/react-query";
import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";

interface CreatePayrollTransactionParams {
  month: string;
  year: string;
  salary?: string;
  cut?: string;
  bonus?: string;
  extra?: string;
  comment?: string;
}

export const useCreatePayrollTransaction = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreatePayrollTransactionParams) => {
      const { data } = await axiosInstance.post(
        endpoints.payroll.transactions.create,
        params
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payroll-transactions"] });
    },
    ...options
  });
}; 