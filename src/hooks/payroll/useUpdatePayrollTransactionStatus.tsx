import { useMutation, useQueryClient } from "@tanstack/react-query";
import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";

interface UpdatePayrollTransactionStatusParams {
  transaction_id: number;
  status: "approved" | "rejected";
  comment?: string;
}

export const useUpdatePayrollTransactionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdatePayrollTransactionStatusParams) => {
      const { data } = await axiosInstance.post(
        params.status === "approved"
          ? endpoints.payroll.transactions.approve(params.transaction_id.toString())
          : endpoints.payroll.transactions.reject(params.transaction_id.toString()),
        params
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payroll-transactions"] });
    },
  });
}; 