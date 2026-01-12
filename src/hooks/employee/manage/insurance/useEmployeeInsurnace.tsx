import endpoints from "@/api/endpoints";
import { Insurance } from "@/Dashboard/Pages/StaffManagement/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchEmployeeInsurance = async ({ id = "" }) => {
  return axiosInstance
    .get<ApiResponse<Insurance>>(endpoints.employee.manage.insurance.show(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useEmployeeInsurance = () => {
  const { id } = useParams<{ id?: string }>();
  return useQuery<Insurance, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["employee-insurance", id],
    queryFn: () => fetchEmployeeInsurance({ id }),
  });
};
