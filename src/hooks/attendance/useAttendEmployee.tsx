import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AttendEmployeeResponse {
  message: string;
  status: boolean;
}

interface AttendEmployeeParams {
  employee_id: string;
  date: string;
  time: string;
  place_id?: string;
}

const attendEmployee = async (params: AttendEmployeeParams) => {
  const formattedPayload = convertObjectValuesToString(params);
  const response = await axiosInstance
    .post(endpoints.attendance.attend, formattedPayload);
  return response.data;
};

export const useAttendEmployee = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation<AttendEmployeeResponse, Error, AttendEmployeeParams>({
    mutationFn: attendEmployee,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ['attendance-information'] });
    },

  });
};
