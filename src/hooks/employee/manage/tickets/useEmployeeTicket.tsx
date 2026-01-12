import endpoints from "@/api/endpoints";
import { Ticket } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchEmployeeTicket = async (id = "") => {
  return axiosInstance
    .get<ApiResponse<Ticket>>(endpoints.employee.manage.tickets.show(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useEmployeeTicket = () => {
  const { id } = useParams<{ id?: string }>();
  return useQuery({
    staleTime: 15 * 60 * 1000,
    queryKey: ["employee-ticket", id],
    queryFn: () => fetchEmployeeTicket(id),
  });

};
