import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";
import {
    useMutation,
    UseMutationOptions,
    useQueryClient,
} from "@tanstack/react-query";

// Define the status type if you have specific status values
type TaskStatus = "completed" | "pending" | "in_progress"; // adjust these values based on your API

// Define the input type for the status update
interface UpdateTaskStatusParams {
    id: string | number;
    status: TaskStatus;
}

const updateTaskStatus = async ({ id, status }: UpdateTaskStatusParams) => {
    return axiosInstance
        .post(`${endpoints.Tasks.all}/${id}/status`, { status })
        .then((res) => res.data);
};

export const useUpdateTaskStatus = (options?: UseMutationOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTaskStatus,
        onSuccess: (data, variables, context) => {
            // Invalidate both the tasks list and the specific task
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["task", variables.id] });
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            console.error("Error updating task status:", error);
            options?.onError?.(error, variables, context);
        },
    });
};

// Usage example:
/*
const { mutate: updateStatus, isLoading } = useUpdateTaskStatus({
  onSuccess: () => {
    toast.success("تم تحديث حالة المهمة بنجاح");
  },
});

// Call the mutation
updateStatus({ id: "1", status: "completed" });
*/
