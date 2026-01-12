import endpoints from "@/api/endpoints";
import { Asset } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { queryClient } from "@/utils/queryClient";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export interface UpdateEmployeeAssetPayload {
  id: string;
  assetId: string;
  title?: string;
  code?: string;
  type?: string;
  status?: string;
  notes?: string;
}

const updateEmployeeAsset = async (payload: UpdateEmployeeAssetPayload) => {
  const { id, assetId, ...data } = payload;

  return axiosInstance
    .put<ApiResponse<Asset>>(
      endpoints.employee.manage.assets.update(assetId),
      data
    )
    .then((res) => res.data?.data ?? null);
};

export const useUpdateEmployeeAsset = (
  options?: UseMutationOptions<
    Asset | null,
    Error,
    UpdateEmployeeAssetPayload,
    unknown
  >
) => {
  return useMutation({
    mutationFn: updateEmployeeAsset,
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({ queryKey: ["employee-assets"] });
    },
  });
}; 