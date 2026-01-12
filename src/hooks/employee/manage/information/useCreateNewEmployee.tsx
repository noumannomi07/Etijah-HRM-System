import endpoints from "@/api/endpoints";
import { TEmployeeForm } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/types";
import { Employee } from "@/Dashboard/Pages/StaffManagement/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation } from "@tanstack/react-query";

const createEmployee = async (employeeData: TEmployeeForm) => {
  const formattedPayload = convertObjectValuesToString(employeeData);
  return axiosInstance
    .post<ApiResponse<Employee>>(
      endpoints.employee.create,
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

export const useCreateNewEmployee = () => {
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      console.log("Employee created successfully");
    },
    onError: (error) => {
      console.error("Error creating employee:", error);
    },
  });
};
