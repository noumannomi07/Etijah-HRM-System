import endpoints from "@/api/endpoints";
import { Asset } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { queryClient } from "@/utils/queryClient";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export interface CreateEmployeeAssetPayload {
  id: string;
  title: string;
  content: string;
  deliver_date: string;
  image: File;
}

const createEmployeeAsset = async (payload: CreateEmployeeAssetPayload) => {
  const { id, ...data } = payload;

  return axiosInstance
    .post<ApiResponse<Asset>>(
      endpoints.employee.manage.assets.create(id),
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then((res) => res.data?.data ?? null);
};

export const useCreateEmployeeAsset = (
  options?: UseMutationOptions<
    Asset | null,
    Error,
    CreateEmployeeAssetPayload,
    unknown
  >
) => {
  return useMutation({
    mutationFn: createEmployeeAsset,
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({ queryKey: ["employee-assets"] });
    },
  });
}; 