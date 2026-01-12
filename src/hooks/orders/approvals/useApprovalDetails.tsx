import endpoints from "@/api/endpoints";
import { Approval } from "@/Dashboard/Pages/Orders/types/Approval";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchApprovalDetails = async (id = "") => {
  return axiosInstance
    .get<ApiResponse<Approval>>(endpoints.orders.approval.show(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useApprovalDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const query = useQuery<Approval, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["approval-details", id],
    enabled: !!id,
    queryFn: () => fetchApprovalDetails(id),
  });

  return {
    ...query,
    data: query?.data,
  };
}; 