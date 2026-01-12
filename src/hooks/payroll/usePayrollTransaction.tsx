import { useQuery } from "@tanstack/react-query";
import { PayrollTransaction } from "@/Dashboard/Pages/types";
import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";

export const usePayrollTransaction = (id: string | undefined) => {
  return useQuery({
    queryKey: ["payroll-transaction", id],
    queryFn: async () => {
      if (!id) throw new Error("Transaction ID is required");

      const { data } = await axiosInstance.get<PayrollTransaction>(
        endpoints.payroll.transactions.show(id)
      );
      return data;
    },
    enabled: !!id,
  });
}; 