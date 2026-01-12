import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import i18next from "i18next";

export interface VacationBalanceItem {
  id: number;
  title: string;
  content: string;
  days: number;
  paid: number;
  paid_percent: number;
  can_take_after: number;
  days_calculated: {
    real_days: number;
    taken_days: number;
    left_days: number;
  };
  created_at: string;
  updated_at: string;
}

export interface VacationBalanceResponse {
  types: VacationBalanceItem[];
}

const fetchVacationBalance = async (employeeId: number) => {
  // Try JSON payload format
  const response = await axiosInstance.post(
    endpoints.orders.vacations.checkEmployeeVacation,
    {
      employee_id: employeeId,
    },
    {
      headers: {
        "Accept-Language": i18next.language,
      },
    }
  );
  
  // Return the response data directly (not response.data.data)
  return response.data;
};

export const useVacationBalance = (employeeId?: number) => {
  return useQuery({
    queryKey: ["vacationBalance", employeeId],
    queryFn: () => fetchVacationBalance(employeeId!),
    enabled: !!employeeId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

