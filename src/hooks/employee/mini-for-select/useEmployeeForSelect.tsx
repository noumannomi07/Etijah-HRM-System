import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchEmployeeForSelect = async () => {
    return axiosInstance.get("/mini-employees").then((res) => {
        return res.data?.data.map((emp: any) => {
            return {
                ...emp,
                value: emp?.id,
                label: emp?.name,
            };
        });
    });
};

export const useEmployeeSelect = () => {
    const query = useQuery({
        staleTime: 15 * 60 * 1000,
        queryKey: ["/mini-employees"],
        queryFn: () => fetchEmployeeForSelect(),
    });

    return {
        ...query,
        data: query?.data,
    };
};
