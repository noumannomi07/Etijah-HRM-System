import endpoints from "@/api/endpoints";
import { TasksData } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchTask = async (id?: number) => {
    if (!id) return []; // Return an empty array if no id is provided
    const response = await axiosInstance.get<TasksData[]>(
        endpoints.employee.manage.tasks.show(id)
    );
    return response?.data || []; // Extract and return only the data array
};

export const useShowEmployeeTask = (id?: number) => {
    return useQuery<TasksData[], Error>({
        staleTime: 15 * 60 * 1000, // 15 minutes
        queryKey: ["employeetasks", id], // Include id in the query key to keep unique cache per task
        queryFn: () => fetchTask(id!), // Pass the id to fetchTask
        enabled: !!id, // Only run query if id is provided
    });
};
