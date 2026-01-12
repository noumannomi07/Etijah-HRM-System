import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Vacation, VacationFormData } from "./useVacations";

const updateVacation = async (vacationData: VacationFormData, id: string) => {
    return axiosInstance
        .post<ApiResponse<Vacation>>(`/updatevacation/${id}`, vacationData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => {
            return res.data?.data;
        });
};

export const useUpdateVacation = (
    options?: UseMutationOptions<
        Vacation,
        unknown,
        { id: string; vacationData: VacationFormData }
    >
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables: {
            id: string;
            vacationData: VacationFormData;
        }) => updateVacation(variables.vacationData, variables.id),
        onSuccess: (data, variables, context) => {
            // Invalidate and refetch specific vacation and vacations list
            queryClient.invalidateQueries({
                queryKey: ["vacation-details", variables.id],
            });
            queryClient.invalidateQueries({ queryKey: ["vacations"] });
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            console.error("Error updating vacation:", error);
            options?.onError?.(error, variables, context);
        },
    });
};
