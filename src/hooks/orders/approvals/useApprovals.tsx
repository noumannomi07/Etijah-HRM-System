import endpoints from "@/api/endpoints";
import { ApprovalSettings } from "@/Dashboard/Pages/Orders/types/Approval";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchApprovals = async () => {
  return axiosInstance
    .get(endpoints.orders.approval.all)
    .then((res) => {
      return res.data?.data;
    });
};

export const useApprovals = () => {
  return useQuery<ApprovalSettings, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["approvals"],
    queryFn: fetchApprovals,
  });
}; 