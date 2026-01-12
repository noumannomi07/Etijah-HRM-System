import endpoints from "@/api/endpoints";
import { TEmployeeForm } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/types";
import { Employee } from "@/Dashboard/Pages/StaffManagement/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation } from "@tanstack/react-query";

const updateEmployee = async (employeeData: TEmployeeForm, id: string) => {
  const formattedPayload = convertObjectValuesToString(employeeData);
  return axiosInstance
    .put<ApiResponse<Employee>>(
      endpoints.employee.manage.information.update(id),
      new URLSearchParams({ ...formattedPayload }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => {
      return res.data?.data;
    });
};

export const useUpdateEmployee = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (variables: { id: string; employeeData: TEmployeeForm }) =>
      updateEmployee(variables.employeeData, variables.id),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
