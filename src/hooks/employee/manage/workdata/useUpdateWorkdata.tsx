import endpoints from "@/api/endpoints";
import { TWorkdataForm } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/types";
import { Workdata } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

type UpdateWorkdataPayload = {
  workdata: TWorkdataForm,
  id: string
}

const updateWorkdata = async ({ id, workdata }: UpdateWorkdataPayload) => {
  return axiosInstance
    .post(
      endpoints.employee.manage.work_data.update(id),
      workdata,
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

export const useUpdateWorkdata = (options?: UseMutationOptions<Workdata, Error, UpdateWorkdataPayload, unknown>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateWorkdataPayload) =>
      updateWorkdata(variables),
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({ queryKey: ["workdata-information", variables.id] });
    },
  });
};
