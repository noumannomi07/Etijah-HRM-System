import endpoints from "@/api/endpoints";
import { VacationType } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface CheckVacationParams {
  employee_id?: string;
}

interface CheckVacationResponse {
  types: Array<VacationType>
}

const checkEmployeeVacation = async (params: CheckVacationParams) => {
  const formattedPayload = new URLSearchParams(params as any);
  return axiosInstance
    .post<CheckVacationResponse>(
      endpoints.orders.vacations.checkEmployeeVacation,
      formattedPayload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};

export const useCheckEmployeeVacation = (params: CheckVacationParams, options = {}) => {
  return useQuery({
    queryKey: ["vacation-check", params],
    queryFn: () => checkEmployeeVacation(params),
    enabled: !!params.employee_id,
    ...options
  });
}; 