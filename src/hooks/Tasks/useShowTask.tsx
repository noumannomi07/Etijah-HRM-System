import endpoints from "@/api/endpoints";
import { TasksData } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchTask = async (id: string | number) => {
    if (!id) return []; // Return an empty array if no id is provided
    const response = await axiosInstance.get<TasksData[]>(
        endpoints.Tasks.show(id)
    );
    return response?.data || []; // Extract and return only the data array
};

export const useTask = (id?: string | number) => {
    return useQuery<TasksData[], Error>({
        staleTime: 15 * 60 * 1000, // 15 minutes
        queryKey: ["task", id], // Include id in the query key to keep unique cache per task
        queryFn: () => fetchTask(id!), // Pass the id to fetchTask
        enabled: !!id, // Only run query if id is provided
    });
};
