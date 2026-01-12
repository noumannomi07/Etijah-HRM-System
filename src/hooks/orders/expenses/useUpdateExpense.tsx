import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { Expense, ExpenseRequest } from "@/Dashboard/Pages/types";
import { convertObjectValuesToString } from "@/utils/payload";

const updateExpense = async (id: string, expenseData: ExpenseRequest) => {
  const formattedPayload = convertObjectValuesToString(expenseData);
  return axiosInstance
    .put<ApiResponse<Expense>>(
      endpoints.orders.expenses.update(id),
      formattedPayload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => {
      return res.data?.data;
    });
};

type UpdateExpenseOptions = UseMutationOptions<
  Expense, Error, { id: string; expenseData: ExpenseRequest }, unknown
>;

export const useUpdateExpense = (options?: UpdateExpenseOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, expenseData }: { id: string; expenseData: ExpenseRequest }) => updateExpense(id, expenseData),
    onSuccess: (_, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["expense-details", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      options?.onSuccess?.(_, variables, context);
    },
    onError: (error) => {
      console.error("Error updating expense:", error);
    },
  });
}; 