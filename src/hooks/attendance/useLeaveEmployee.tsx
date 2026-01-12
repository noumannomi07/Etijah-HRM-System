import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LeaveEmployeeResponse {
  message: string;
  status: boolean;
}

interface LeaveEmployeeParams {
  employee_id: string;
  date: string;
  time: string;
  place_id?: string;
}

const leaveEmployee = async (params: LeaveEmployeeParams) => {
  const formattedPayload = convertObjectValuesToString(params);
  const response = await axiosInstance
    .post(endpoints.attendance.leave, formattedPayload);
  return response.data.data;
};

export const useLeaveEmployee = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation<LeaveEmployeeResponse, Error, LeaveEmployeeParams>({
    mutationFn: leaveEmployee,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ['attendance-information'] });
    },
  });
};
