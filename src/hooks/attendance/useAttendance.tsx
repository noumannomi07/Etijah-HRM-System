import endpoints from "@/api/endpoints";
import { AttendOrLeave } from "@/Dashboard/Pages/AttendanceDeparture/types";
import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const fetchAttendance = async (params?: Record<string, string | null>) => {
  return axiosInstance
    .get<ApiResponse<Array<AttendOrLeave>>>(endpoints.attendance.all, {
      params,
    })
    .then((res) => {
      return res.data?.data;
    });
};

export const useAttendanceInformation = () => {
  const [searchParams] = useSearchParams();
  const dateFilter = searchParams.get("date");
  const searchFilter = searchParams.get("search") ?? '';
  const sectionInfo = searchParams.get("sectionInfo");
  const workplace = searchParams.get("workplace");

  return useQuery({
    staleTime: 15 * 60 * 1000,
    queryKey: ["attendance-information", dateFilter, searchFilter, sectionInfo, workplace],
    queryFn: () => fetchAttendance({
      date: dateFilter,
      employee: searchFilter?.length > 0 ? searchFilter : null,
      category_id: sectionInfo,
      place_id: workplace,
    }),
  });
};
