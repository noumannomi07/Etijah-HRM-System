import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import { useParams } from "react-router-dom";
import { Violation } from "@/types/Financial";

export const useEmployeeViolations = () => {
  const { id: employeeId } = useParams<{ id: string }>();

  return useQuery({
    queryKey: ["employee-violations", employeeId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<Violation[]>>(
        endpoints.employee.manage.violation.violations(employeeId)
      );
      return data.data || [];
    },
    enabled: !!employeeId,
  });
}; 