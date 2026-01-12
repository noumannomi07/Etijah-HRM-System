import endpoints from "@/api/endpoints";
import { EmployeeFile } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface DeleteEmployeeFilePayload {
  id: string;
  fileId: string;
}

const deleteEmployeeFile = async ({
  id,
  fileId
}: DeleteEmployeeFilePayload) => {
  return axiosInstance
    .delete<ApiResponse<EmployeeFile>>(
      endpoints.employee.manage.files.delete(id, fileId)
    )
    .then((res) => res.data?.data);
};

export const useDeleteEmployeeFile = (
  options?: UseMutationOptions<
    EmployeeFile | undefined,
    Error,
    DeleteEmployeeFilePayload,
    unknown
  >
) => {
  return useMutation({
    mutationFn: deleteEmployeeFile,
    ...options
  });
};
