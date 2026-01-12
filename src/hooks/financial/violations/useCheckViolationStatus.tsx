import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface ViolationStatusResponse {
    type: string;
    value: string;
    times: string;
}

interface ViolationCheckParams {
    employee_id: number;
    violation_rule_id: number;
}

const checkViolationStatus = async (data: ViolationCheckParams) => {
    try {
        const response = await axiosInstance.post<ViolationStatusResponse>(
            endpoints.financial.violations.checkViolationsStatus,
            data
        );

        return response.data;
    } catch (error) {
        throw new Error("فشل في انشاء المخالفة");
    }
};

export const useCheckViolationStatus = () => {
    return useMutation({
        mutationFn: checkViolationStatus,
        onError: (error: Error) => {
            toast.error(error.message || "Failed to check violation status");
        },
    });
};
