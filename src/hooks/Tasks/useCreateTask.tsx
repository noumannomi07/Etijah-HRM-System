import endpoints from "@/api/endpoints";

import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { convertObjectValuesToString } from "@/utils/payload";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { VacationRequestFormData } from "@/Dashboard/Pages/Orders/types/VacationRequest";
import { TaskType } from "@/Dashboard/Pages/types";
import { TaskFormData } from "@/Dashboard/Pages/TasksPage/types";

const createTask = async (TaskData: TaskFormData) => {

  return axiosInstance
    .post<TaskType>(
      endpoints.Tasks.create,
      { ...TaskData },
    
    )
    .then((res) => {
      return res.data;
    });
};

export const useCreateTask = (options?: UseMutationOptions<TaskType, unknown, VacationRequestFormData>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Error creating Task:", error);
      options?.onError?.(error, variables, context);
    },
  });
}; 