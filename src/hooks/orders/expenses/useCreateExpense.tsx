import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CommonRouteKeys, FullRoutes } from "@/Routes/routes";
import { Expense } from "@/Dashboard/Pages/types";
import { ExpensesCompenstationType, MileageDistanceCompensationType, MileageMapCompensationType, MileageDistanceCounterCompensationType } from "@/Dashboard/Pages/Orders/Components/BusinessExpenseRequests/types";

const createExpense = async (
  expenseData:
    ExpensesCompenstationType |
    MileageDistanceCompensationType |
    MileageDistanceCounterCompensationType |
    MileageMapCompensationType
) => {
  const { type, ...rest } = expenseData;
  const formattedPayload = convertObjectValuesToString(rest);
  return axiosInstance
    .post<ApiResponse<Expense>>(
      endpoints.orders.expenses.create,
      formattedPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ) 
    .then((res) => {
      return res.data?.data;
    });
};

export const useCreateExpense = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      navigate(FullRoutes.Dashboard.Orders[CommonRouteKeys.All]);
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error creating expense:", error);
      onError?.(error);
    },
  });
}; 