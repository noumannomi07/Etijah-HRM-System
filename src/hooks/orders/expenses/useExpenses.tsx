import endpoints from "@/api/endpoints";
import { ExpenseRequest } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface ExpenseResponse {
  mine: ExpenseRequest[];
  all: ExpenseRequest[];
}

const fetchExpenses = async () => {
  const response = await axiosInstance.get(endpoints.orders.expenses.all);
  return response.data;
};

export const useExpenses = (filter: 'mine' | 'all' = 'all') => {
  const query = useQuery<ExpenseResponse, Error>({
    staleTime: 15 * 60 * 1000, // 15 minutes
    queryKey: ["expenses", filter],
    queryFn: fetchExpenses
  });

  return {
    ...query,
    data: filter === 'mine' ? query?.data?.mine || [] : query?.data?.all || [],
  };
}; 