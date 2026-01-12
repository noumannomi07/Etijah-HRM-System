import endpoints from "@/api/endpoints";
import { TasksData } from "@/Dashboard/Pages/types"; // Assuming TaskEntry is the type for tasks

import axiosInstance from "@/utils/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchTasks = async () => {
    return axiosInstance
        .get<TasksData[]>(endpoints.Tasks.all) // Assuming this endpoint fetches tasks
        .then((res) => res?.data || []); // Extract and return only the data array
};

const createComment = async (id: any, comment: string) => {
    return axiosInstance.post<TasksData[]>(endpoints.Tasks.createComment, {
        task_id: id,
        comment,
    });
};

export const useTaskComment = () => {
    const queryClient = useQueryClient();

    const query = useQuery<TasksData[], Error>({
        staleTime: 15 * 60 * 1000, // 15 minutes
        queryKey: ["tasks"], // Update the query key to "tasks"
        queryFn: fetchTasks,
    });

    const mutation = useMutation({
        mutationFn: ({ id, comment }: { id: any; comment: string }) =>
            createComment(id, comment),
        onSuccess: () => {
            // Refetch tasks after a successful comment creation
            queryClient.invalidateQueries({ queryKey: ["task"] });
        },
    });

    return {
        ...query,
        data: query?.data || [],
        createComment: mutation.mutate, // Expose the mutation function
        isCreatingComment: mutation.isPending, // Expose loading state for the mutation
    };
};
