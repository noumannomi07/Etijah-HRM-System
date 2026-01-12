import endpoints from "@/api/endpoints";
import { Workdata } from "@/Dashboard/Pages/StaffManagement/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchEmployeeWorkdata = async (id = "") => {
  try {
    const response = await axiosInstance.get<ApiResponse<Workdata>>(
      endpoints.employee.manage.work_data.show(id)
    );
    // If API returns success: false with "Work data not found", return null instead of throwing
    if (response.data?.success === false && response.data?.message?.includes("Work data not found")) {
      return null;
    }
    return response.data?.data;
  } catch (error: any) {
    // If 404 or "Work data not found" error, return null instead of throwing
    if (
      error.response?.status === 404 ||
      error.response?.data?.message?.includes("Work data not found")
    ) {
      return null;
    }
    // For other errors, throw to let React Query handle it
    throw error;
  }
};

export const useEmployeeWorkData = () => {
  const { id } = useParams<{ id?: string }>();
  const query = useQuery<Workdata, Error>({
    staleTime: 1000 * 60 * 15,
    queryKey: ["employee-work-data", id],
    enabled: !!id,
    queryFn: () => fetchEmployeeWorkdata(id),
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    data: query?.data,
  };
};
