import endpoints from "@/api/endpoints";

import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "@/Dashboard/Pages/types";
import { TaskFormData } from "@/Dashboard/Pages/TasksPage/types";

const updateTask = async ({ id, TaskData }: { id: string; TaskData: TaskFormData }) => {
  return axiosInstance
    .put<TaskType>(endpoints.Tasks.update(id), { ...TaskData })
    .then((res) => {
      return res.data;
    });
};

export const useUpdateTask = (options?: UseMutationOptions<TaskType, unknown, { id: string; TaskData: TaskFormData }>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Error updating Task:", error);
      options?.onError?.(error, variables, context);
    },
  });
};
