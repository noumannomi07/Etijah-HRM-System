import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdvanceFormData } from "@/Dashboard/Pages/Orders/types/Advance";
import { Advance } from "@/Dashboard/Pages/types";
import { useNavigate } from "react-router-dom";
import { CommonRouteKeys, FullRoutes } from "@/Routes/routes";

const createAdvance = async (advanceData: AdvanceFormData) => {
  const formattedPayload = convertObjectValuesToString(advanceData);
  return axiosInstance
    .post<ApiResponse<Advance>>(
      endpoints.orders.advances.create,
      formattedPayload,
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

export const useCreateAdvance = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createAdvance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advances"] });
      navigate(FullRoutes.Dashboard.Orders[CommonRouteKeys.All]);
    },
    onError: (error) => {
      console.error("Error creating advance:", error);
    },
  });
}; 