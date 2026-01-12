import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CommonRouteKeys, FullRoutes } from "@/Routes/routes";
import { Violation, ViolationFormValues } from "@/types/Financial";

const createViolations = async (data: ViolationFormValues) => {
    try {
        const response = await axiosInstance.post<ApiResponse<Violation>>(
            endpoints.financial.violations.create,
            data
        );

        return response.data.data;
    } catch (error) {
        throw new Error("فشل في انشاء المخالفة");
    }
};

export const useCreateViolation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createViolations,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["violations"] });
            navigate(
                FullRoutes.Dashboard.ViolationsManagement[CommonRouteKeys.All]
            );
        },
        onError: (error) => {
            console.error("Error creating advance:", error);
        },
    });
};
