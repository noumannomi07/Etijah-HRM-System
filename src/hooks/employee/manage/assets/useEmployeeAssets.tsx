import endpoints from "@/api/endpoints";
import { Asset } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchEmployeeAssets = async (id = ""): Promise<Asset[]> => {
  return axiosInstance
    .get<ApiResponse<Asset[]>>(endpoints.employee.manage.assets.show(id))
    .then((res) => {
      return res.data?.data ?? [];
    });
};

export const useEmployeeAssets = () => {
  const { id } = useParams<{ id?: string }>();
  const query = useQuery({
    staleTime: 15 * 60 * 1000,
    queryKey: ["employee-assets", id],
    queryFn: () => fetchEmployeeAssets(id),
    enabled: !!id,
  });

  return {
    ...query,
    data: query?.data,
  };
}; 