import { useQuery } from "@tanstack/react-query";
import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";
import { useSearchParams } from "react-router-dom";
import { PayrollTransaction } from "@/Dashboard/Pages/types";

export interface PayrollTransactionsResponse {
  pending: PayrollTransaction[];
  approved: PayrollTransaction[];
  rejected: PayrollTransaction[];
}

export const usePayrollTransactions = () => {
  const [searchParams] = useSearchParams();
  const start_of_month = searchParams.get("start_of_month");
  const month = start_of_month ? new Date(start_of_month).getMonth() + 1 : undefined;
  const year = start_of_month ? new Date(start_of_month).getFullYear() : undefined;
  const search = searchParams.get("search");

  const _params: { month?: string; year?: string; search?: string } = {};

  if (month) _params.month = month.toString();
  if (year) _params.year = year.toString();
  if (search) _params.search = search;

  return useQuery({
    queryKey: ["payroll-transactions", { ..._params }],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PayrollTransactionsResponse>(
        endpoints.payroll.transactions.all,
        {
          params: _params,
        }
      );
      return data;
    },
    enabled: !!start_of_month,
  });
}; 