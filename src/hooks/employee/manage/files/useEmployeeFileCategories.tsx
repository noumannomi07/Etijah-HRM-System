import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";

export interface EmployeeFileCategory {
  id: number;
  title: string;
  is_required: boolean;
}

const getEmployeeFileCategories = async () => {
  const response = await axiosInstance.get("/employee-file-category");
  return response.data?.data;
};

export const useEmployeeFileCategories = () => {
  return useQuery<EmployeeFileCategory[]>({
    queryKey: ["employee-file-categories"],
    queryFn: getEmployeeFileCategories,
  });
}; 