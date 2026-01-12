import endpoints from "@/api/endpoints";
import { Ticket } from "@/Dashboard/Pages/StaffManagement/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UpdateWorkdataPayload = {
  ticketData: Ticket;
  id: string;
};

const updateEmployeeTicket = async ({
  id,
  ticketData,
}: UpdateWorkdataPayload) => {
  const formattedPayload = convertObjectValuesToString(ticketData);
  return axiosInstance
    .post<ApiResponse<Ticket>>(
      endpoints.employee.manage.tickets.update(id),
      new URLSearchParams({ ...formattedPayload }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => {
      return res.data?.data;
    });
};

export const useUpdateEmployeeTicket = (
  options?: UseMutationOptions<Ticket, Error, UpdateWorkdataPayload, unknown>
) => {
  return useMutation({
    mutationFn: (variables: UpdateWorkdataPayload) =>
      updateEmployeeTicket(variables),
    ...options,
  });
};
