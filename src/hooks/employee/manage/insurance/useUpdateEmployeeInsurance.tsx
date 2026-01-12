import endpoints from "@/api/endpoints";
import { TInsuranceForm } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/types";
import { Insurance } from "@/Dashboard/Pages/StaffManagement/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UpdateEmployeeInsurancePayload = {
  insurance: TInsuranceForm,
  id: string
}

const updateEmployeeInsurance = async ({ id, insurance }: UpdateEmployeeInsurancePayload) => {
  const formattedPayload = convertObjectValuesToString(insurance);
  return axiosInstance
    .post<ApiResponse<Insurance>>(
      endpoints.employee.manage.insurance.show(id),
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

export const useUpdateEmployeeInsurance = (options?: UseMutationOptions<Insurance, Error, UpdateEmployeeInsurancePayload, unknown>) => {
  return useMutation({
    mutationFn: (variables: UpdateEmployeeInsurancePayload) =>
      updateEmployeeInsurance(variables),
    ...options
  });
};
