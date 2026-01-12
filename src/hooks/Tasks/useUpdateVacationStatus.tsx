import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateVacationStatusParams {
  vacation_id: string;
  status: string;
  comment?: string;
}

const updateVacationStatus = async (params: UpdateVacationStatusParams) => {
  const formattedPayload = new URLSearchParams(params as any);
  return axiosInstance
    .post<ApiResponse<{ success: boolean }>>(
      endpoints.orders.vacations.updateVacationStatus,
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

export const useUpdateVacationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVacationStatus,
    onSuccess: (_, variables) => {
      // Invalidate and refetch specific vacation and vacations list
      queryClient.invalidateQueries({ queryKey: ["vacation-details", variables.vacation_id] });
      queryClient.invalidateQueries({ queryKey: ["vacations"] });
    },
    onError: (error) => {
      console.error("Error updating vacation status:", error);
    },
  });
}; 