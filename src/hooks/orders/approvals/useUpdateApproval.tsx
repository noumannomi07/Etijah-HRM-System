import endpoints from "@/api/endpoints";
import { Approval, ApprovalFormData } from "@/Dashboard/Pages/Orders/types/Approval";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

const updateApproval = async (id: string, approvalData: ApprovalFormData) => {
  const formData = convertObjectValuesToString(approvalData);

  return axiosInstance
    .put<ApiResponse<Approval>>(
      endpoints.orders.approval.update(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      return res.data?.data;
    });
};

type UpdateApprovalOptions = UseMutationOptions<
  Approval, Error, { id: string; approvalData: ApprovalFormData }, unknown
>;

export const useUpdateApproval = (options?: UpdateApprovalOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, approvalData }: { id: string; approvalData: ApprovalFormData }) =>
      updateApproval(id, approvalData),
    onSuccess: (_, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["approval-details", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
      options?.onSuccess?.(_, variables, context);
    },
    onError: (error) => {
      console.error("Error updating approval:", error);
    },
  });
}; 