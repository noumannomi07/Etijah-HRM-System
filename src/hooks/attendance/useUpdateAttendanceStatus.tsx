import { useMutation, useQueryClient } from "@tanstack/react-query";
import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";

interface UpdateAttendanceStatusParams {
  attendance_id: number;
  status: "approved" | "rejected";
}

export const useUpdateAttendanceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdateAttendanceStatusParams) => {
      const { data } = await axiosInstance.post(
        endpoints.employee.attendance_data.updateStatus,
        params
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance-data"] });
    },
  });
}; 