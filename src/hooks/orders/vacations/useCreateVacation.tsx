import endpoints from "@/api/endpoints";
import { VacationEntry } from "@/Dashboard/Pages/StaffManagement/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { VacationRequestFormData } from "@/Dashboard/Pages/Orders/types/VacationRequest";

const createVacation = async (vacationData: VacationRequestFormData) => {
  const formData = new FormData();

  formData.append("employee_id", vacationData.employee_id?.toString() || "");
  formData.append("vacation_manage_id", vacationData.vacation_manage_id?.toString() || "");
  formData.append("start_date", vacationData.start_date);
  formData.append("end_date", vacationData.end_date);
  formData.append("note", vacationData.note || "");

  if (vacationData.file instanceof File) {
    formData.append("file", vacationData.file);
  }

  const response = await axiosInstance.post<ApiResponse<VacationEntry>>(
    endpoints.orders.vacations.create,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

export const useCreateVacation = (
  options?: UseMutationOptions<VacationEntry, unknown, VacationRequestFormData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVacation,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["vacations"] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Error creating vacation:", error);
      options?.onError?.(error, variables, context);
    },
  });
};
