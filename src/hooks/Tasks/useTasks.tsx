import endpoints from "@/api/endpoints";
import { TasksData } from "@/Dashboard/Pages/types"; // Assuming TaskEntry is the type for tasks

import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchTasks = async () => {
  return axiosInstance
    .get<TasksData[]>(endpoints.Tasks.all)
    .then((res) => {

      return res?.data || []; // Extract and return only the data array
    });
};

export const useTasks = () => {
  const query = useQuery<TasksData[], Error>({
    staleTime: 15 * 60 * 1000, // 15 minutes
    queryKey: ["tasks"], // Update the query key to "tasks"
    queryFn: fetchTasks,
  });

  return {
    ...query,
    data: query?.data || [],
  };
};