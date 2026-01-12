import endpoints from "@/api/endpoints";
import { Employee } from "@/Dashboard/Pages/StaffManagement/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UpdateEmployeeProps = {
  id: string;
};

const updateEmployeeStatus = async (args: UpdateEmployeeProps) => {
  const { id } = args;
  return axiosInstance
    .get<ApiResponse<Employee>>(
      endpoints.employee.manage.information.change_status(id)
    )
    .then((res) => {
      return res.data?.data;
    });
};

export const useUpdateEmployeeStatus = (
  options?: UseMutationOptions<Employee, Error, UpdateEmployeeProps, unknown>
) => {
  return useMutation({
    mutationFn: updateEmployeeStatus,
    ...options,
  });
};
