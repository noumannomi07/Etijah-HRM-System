import endpoints from "@/api/endpoints";
import { Workdata } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchWorkdataInformation = async ({ id = "" }) => {
  try {
    const response = await axiosInstance.get(
      endpoints.employee.manage.work_data.update(id)
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

export const useWorkdataInformation = () => {
  const { id } = useParams<{ id?: string }>();
  return useQuery<Workdata, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["workdata-information", id],
    queryFn: () => fetchWorkdataInformation({ id }),
    enabled: !!id,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });
};
