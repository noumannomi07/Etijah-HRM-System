import endpoints from "@/api/endpoints";
import { EmployeeFile } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export interface UpdateEmployeeFilePayload {
  id: string;
  fileId: string;
  title?: string;
  code?: string;
  expire_date?: string;
  file?: File;
}
const updateEmployeeFile = async (payload: UpdateEmployeeFilePayload) => {
  const { id, fileId, ...data } = payload;
  const formData = new FormData();

  if (data.title) formData.append("title", data.title);
  if (data.code) formData.append("code", data.code);
  if (data.expire_date) formData.append("expire_date", data.expire_date);
  if (data.file) formData.append("file", data.file);

  return axiosInstance
    .post<ApiResponse<EmployeeFile>>(
      endpoints.employee.manage.files.update(id, fileId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
    .then((res) => res.data?.data);
};

export const useUpdateEmployeeFile = (
  options?: UseMutationOptions<
    EmployeeFile | undefined,
    Error,
    UpdateEmployeeFilePayload,
    unknown
  >
) => {
  return useMutation({
    mutationFn: updateEmployeeFile,
    ...options
  });
};
