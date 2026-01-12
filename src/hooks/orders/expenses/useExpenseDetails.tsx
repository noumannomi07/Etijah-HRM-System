import endpoints from "@/api/endpoints";
import { Expense } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchExpenseDetails = async (id = "") => {
  return axiosInstance
    .get<ApiResponse<Expense>>(endpoints.orders.expenses.show(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useExpenseDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const query = useQuery<Expense, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["expense-details", id],
    enabled: !!id,
    queryFn: () => fetchExpenseDetails(id),
  });

  return {
    ...query,
    data: query?.data,
  };
}; 