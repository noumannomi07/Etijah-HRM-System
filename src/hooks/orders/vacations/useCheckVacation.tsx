import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

interface CheckVacationParams {
  employee_id: string;
  start_date: string;
  end_date: string;
  type: string;
}

interface CheckVacationResponse {
  eligible: boolean;
  message: string;
  // Add other fields as needed
}

const checkVacation = async (params: CheckVacationParams) => {
  const formattedPayload = new URLSearchParams(params as any);
  return axiosInstance
    .post<ApiResponse<CheckVacationResponse>>(
      endpoints.orders.vacations.checkVacation,
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

export const useCheckVacation = () => {
  return useMutation({
    mutationFn: checkVacation,
    onError: (error) => {
      console.error("Error checking vacation eligibility:", error);
    },
  });
}; 