import { useMutation, useQueryClient } from "@tanstack/react-query";
import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";

interface CreatePayrollTransactionParams {
  transaction_id: string;
  comment: string;
}

export const useCreateTransactionsComment = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreatePayrollTransactionParams) => {
      const { data } = await axiosInstance.post(
        endpoints.payroll.transactions.createComment,
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