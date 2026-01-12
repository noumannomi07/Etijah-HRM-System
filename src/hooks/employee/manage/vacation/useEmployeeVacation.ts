import endpoints from "@/api/endpoints";
import { VacationData } from "@/Dashboard/Pages/StaffManagement/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchEmployeeVacation = async (id = "", year: string) => {
  return axiosInstance
    .get<VacationData>(endpoints.employee.manage.vancation.show(id), {
      params: { year }
    })
    .then((res) => {
      return res.data;
    });
};

export const useEmployeeVacation = (year: string) => {
  const { id } = useParams<{ id?: string }>();
  return useQuery<VacationData, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["employee-vacation-information", id],
    queryFn: () => fetchEmployeeVacation(id, year),
  });
};
