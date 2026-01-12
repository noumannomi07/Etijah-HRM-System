import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Vacation, VacationFormData } from "./useTasks";

const updateVacation = async (vacationData: VacationFormData, id: string) => {
  const formattedPayload = convertObjectValuesToString(vacationData);
  return axiosInstance
    .put<ApiResponse<Vacation>>(
      endpoints.orders.vacations.update(id),
      new URLSearchParams({ ...formattedPayload }),
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

export const useUpdateVacation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; vacationData: VacationFormData }) =>
      updateVacation(variables.vacationData, variables.id),
    onSuccess: (_, variables) => {
      // Invalidate and refetch specific vacation and vacations list
      queryClient.invalidateQueries({ queryKey: ["vacation-details", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["vacations"] });
    },
    onError: (error) => {
      console.error("Error updating vacation:", error);
    },
  });
}; 