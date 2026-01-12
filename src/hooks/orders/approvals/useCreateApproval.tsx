import endpoints from "@/api/endpoints";
import { Approval, ApprovalFormData } from "@/Dashboard/Pages/Orders/types/Approval";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CommonRouteKeys, FullRoutes } from "@/Routes/routes";
import { convertObjectValuesToString } from "@/utils/payload";

const createApproval = async (approvalData: ApprovalFormData) => {
  const formData = convertObjectValuesToString(approvalData);

  return axiosInstance
    .post<ApiResponse<Approval>>(
      endpoints.orders.approval.create,
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

export const useCreateApproval = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createApproval,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
      navigate(FullRoutes.Dashboard.Orders[CommonRouteKeys.All]);
    },
    onError: (error) => {
      console.error("Error creating approval:", error);
    },
  });
}; 