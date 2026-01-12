import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { Advance } from "@/Dashboard/Pages/types";
import { AdvanceStatusFormData } from "@/Dashboard/Pages/Orders/types/Advance";

const updateAdvanceStatus = async ({ status, advance_id }: AdvanceStatusFormData) => {
  const formattedPayload = convertObjectValuesToString({ advance_id, status });

  return axiosInstance
    .post<ApiResponse<Advance>>(
      endpoints.orders.advances.updateStatus,
      formattedPayload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    );
};

type UpdateAdvanceStatusOptions = UseMutationOptions<
  AxiosResponse<ApiResponse<Advance>, any>, Error, AdvanceStatusFormData, unknown>

export const useUpdateAdvanceStatus = (options?: UpdateAdvanceStatusOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdvanceStatus,
    onSuccess: (_, variables, cn) => {
      // Invalidate and refetch specific advance and advances list
      queryClient.invalidateQueries({ queryKey: ["advance-details", variables.advance_id] });
      queryClient.invalidateQueries({ queryKey: ["advances"] }); 
      options?.onSuccess?.(_, variables, cn);
    },
    onError: (error, variables, context) => {
      console.error("Error updating advance:", error);
      options?.onError?.(error, variables, context);
    },
  });
}; 