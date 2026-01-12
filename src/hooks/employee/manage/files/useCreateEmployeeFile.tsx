import endpoints from "@/api/endpoints";
import { EmployeeFile } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { queryClient } from "@/utils/queryClient";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export interface CreateEmployeeFilePayload {
  id: string;
  title: string;
  file: File;
  category_id: number;
  expire_date?: string;
  code?: string;
}

const createEmployeeFile = async (payload: CreateEmployeeFilePayload) => {
  const { id, ...data } = payload;
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("file", data.file);
  formData.append("category_id", data.category_id.toString());
  if (data.expire_date) formData.append("expire_date", data.expire_date);
  if (data.code) formData.append("code", data.code);

  return axiosInstance
    .post<ApiResponse<EmployeeFile>>(
      endpoints.employee.manage.files.create(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => res.data?.data ?? null);
};

export const useCreateEmployeeFile = (
  options?: UseMutationOptions<
    EmployeeFile | null,
    Error,
    CreateEmployeeFilePayload,
    unknown
  >
) => {
  return useMutation({
    mutationFn: createEmployeeFile,
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({ queryKey: ["employee-files"] });
    },
  });
}; 