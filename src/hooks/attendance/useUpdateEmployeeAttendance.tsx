import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateAttendanceResponse {
  message: string;
  status: boolean;
}

interface UpdateAttendanceParams {
  employee_id: string;
  date: string;
  attend_time?: string;
  leave_time?: string;
  place_id?: string;
}

const updateEmployeeAttendance = async (payload: UpdateAttendanceParams) => {
  const formattedPayload = convertObjectValuesToString(payload);
  const response = await axiosInstance
    .post(endpoints.attendance.update, formattedPayload);
  return response.data;
};

export const useUpdateEmployeeAttendance = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateAttendanceResponse, Error, UpdateAttendanceParams>({
    mutationFn: updateEmployeeAttendance,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ['attendance-information'] });
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
};
