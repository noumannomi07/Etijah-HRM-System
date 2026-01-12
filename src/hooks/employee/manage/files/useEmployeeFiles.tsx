import endpoints from "@/api/endpoints";
import { EmployeeFile, FileCategory } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchEmployeeFiles = async (id = ""): Promise<{
  files: EmployeeFile[];
  missing_categories: FileCategory[];
}> => {
  return axiosInstance
    .get<{
      files: EmployeeFile[];
      missing_categories: FileCategory[];
    }>(endpoints.employee.manage.files.show(id))
    .then((res) => {
      return res.data ?? [];
    });
};

export const useEmployeeFiles = () => {
  const { id } = useParams<{ id?: string }>();
  const query = useQuery({
    staleTime: 15 * 60 * 1000,
    queryKey: ["employee-files", id],
    queryFn: () => fetchEmployeeFiles(id),
    enabled: !!id,
  });

  return {
    ...query,
    data: query?.data,
  };
}; 