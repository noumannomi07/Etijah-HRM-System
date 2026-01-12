import endpoints from "@/api/endpoints";
import { Employee } from "@/Dashboard/Pages/StaffManagement/types";
import { TaskType } from "@/Dashboard/Pages/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const fetchTaskInformation = async (id = "") => {
  return axiosInstance
    .get<TaskType>(endpoints.Tasks.show(id))
    .then((res) => {
      return res.data?.data;
    });
};

export const useTaskInfo = (options?: {
  onSucces?: () => void;
  onError?: (e: Error) => void;
}) => {
  const { id } = useParams<{ id?: string }>();
  const query = useQuery<TaskType, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["task-information", id],
    queryFn: () => fetchTaskInformation(id),
  });

  useEffect(() => {
    if (query.isSuccess && options?.onSucces) {
      options.onSucces();
    } else if (query.isError && options?.onError) {
      options.onError(query.error);
    }
  }, [query.isSuccess]);

  return {
    ...query,
    data: query?.data,
  };
};
