import endpoints from "@/api/endpoints";
import { EmployeeSalary } from "@/types/Financial";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchEmployeeSalary = async (
  id = ''
) => {
  return axiosInstance
    .get
    (endpoints.employee.manage.salary.show(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useEmployeeSalary = () => {
  const { id } = useParams<{ id?: string }>();
  const query = useQuery<EmployeeSalary, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["employee-salary", id],
    queryFn: () => fetchEmployeeSalary(id),
  });

  return {
    ...query,
    data: query?.data,
  }
};
