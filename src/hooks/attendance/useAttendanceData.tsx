import { useQuery } from "@tanstack/react-query";
import { AttendanceDataResponse } from "@/Dashboard/Pages/types";
import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";
import { useSearchParams } from "react-router-dom";

export const useAttendanceData = () => {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const search = searchParams.get("search");
  const _params: { date?: string; search?: string } = {};
  if (date) _params.date = date;
  if (search) _params.search = search;

  return useQuery({
    queryKey: ["attendance-data", { ..._params }],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AttendanceDataResponse>(
        endpoints.employee.attendance_data.all,
        {
          params: _params,
        }
      );
      return data;
    },
  });
}; 