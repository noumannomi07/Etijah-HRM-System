import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteViolation = async (id: string) => {
    return axiosInstance
        .delete<ApiResponse<{ success: boolean }>>(
            endpoints.financial.violations.delete(id)
        )
        .then((res) => {
            return res.data?.data;
        });
};
export const useDeleteViolation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteViolation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["violations"] });
        },
        onError: (error) => {
            console.error("Error deleting violations:", error);
        },
    });
};
