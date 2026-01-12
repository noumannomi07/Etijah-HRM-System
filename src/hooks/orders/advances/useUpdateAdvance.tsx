import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { Advance, EStatus } from "@/Dashboard/Pages/types";

const updateAdvance = async ({ status, id }: { status: EStatus, id: string }) => {
  const formattedPayload = convertObjectValuesToString({ id, status });

  return axiosInstance
    .post<ApiResponse<Advance>>(
      endpoints.orders.advances.update(id),
      formattedPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
};

type UpdateAdvanceOptions = UseMutationOptions<
  AxiosResponse<ApiResponse<Advance>, any>, Error, { status: EStatus, id: string }, unknown>

export const useUpdateAdvance = (options?: UpdateAdvanceOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdvance,
    onSuccess: (_, variables, cn) => {
      // Invalidate and refetch specific advance and advances list
      queryClient.invalidateQueries({ queryKey: ["advance-details", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["advances"] });
      options?.onSuccess?.(_, variables, cn);
    },
    onError: (error) => {
      console.error("Error updating advance:", error);
    },
  });
}; 