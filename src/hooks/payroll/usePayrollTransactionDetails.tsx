import { useQuery } from "@tanstack/react-query";
import { PayrollTransaction } from "@/Dashboard/Pages/types";
import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";
import { ApiResponse } from "@/types/api";


export const usePayrollTransactionDetails = (id: number | null) => {
  return useQuery({
    queryKey: ["payroll-transaction-details", id],
    queryFn: async () => {
      if (!id) throw new Error("Transaction ID is required");

      const { data } = await axiosInstance.get<ApiResponse<PayrollTransaction>>(
        endpoints.payroll.transactions.show(id.toString())
      );
      return data.data;
    },
    enabled: !!id,
  });
};