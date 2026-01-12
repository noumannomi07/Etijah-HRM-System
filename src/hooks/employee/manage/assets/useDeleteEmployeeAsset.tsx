import endpoints from "@/api/endpoints";
import { Asset } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { queryClient } from "@/utils/queryClient";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface DeleteEmployeeAssetPayload {
  id: string;
}

const deleteEmployeeAsset = async ({ id }: DeleteEmployeeAssetPayload) => {
  return axiosInstance
    .delete<ApiResponse<Asset>>(endpoints.employee.manage.assets.delete(id))
    .then((res) => res.data?.data ?? null);
};

export const useDeleteEmployeeAsset = (
  options?: UseMutationOptions<
    Asset | null,
    Error,
    DeleteEmployeeAssetPayload,
    unknown
  >
) => {
  return useMutation({
    mutationFn: deleteEmployeeAsset,
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({ queryKey: ["employee-assets"] });
    },
  });
}; 