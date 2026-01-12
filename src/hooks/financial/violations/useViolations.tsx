import endpoints from "@/api/endpoints";
import { ApiResponse } from "@/types/api";
import { Violation } from "@/types/Financial";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchViolations = async () => {
    return axiosInstance
        .get<ApiResponse<Violation[]>>(endpoints.financial.violations.all)
        .then((res) => {
            return res.data?.data || [];
        });
};

export const useViolations = () => {
    return useQuery<Violation[], Error>({
        staleTime: 15 * 60 * 1000, // 15 minutes
        queryKey: ["violations"],
        retry: 3, // Retry up to 3 times
        retryDelay: (attempt) => attempt * 2000, // 2s delay per attempt
        queryFn: fetchViolations,
    });
};
