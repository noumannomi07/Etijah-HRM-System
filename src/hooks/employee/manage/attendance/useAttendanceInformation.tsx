import endpoints from "@/api/endpoints";
import { AttendanceItem } from "@/Dashboard/Pages/AttendanceDeparture/types";
import { Employee, WorkTime } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export interface EmployeeAttendance {
  total_late: number;
  total_early_out: number;
  total_overtime: number;
  attendance: Array<AttendanceItem & {
    worktime: WorkTime,
    employee_id: Employee
  }>
}

const fetchEmployeeAttendance = async (id = "") => {
  return axiosInstance
    .get(endpoints.employee.manage.attendance.show(id))
    .then((res) => {
      return res.data;
    });
};

export const useAttendanceInformation = () => {
  const { id } = useParams<{ id?: string }>();
  return useQuery<EmployeeAttendance, Error>({
    staleTime: 15 * 60 * 1000,
    queryKey: ["employee-attendance-information", id],
    queryFn: () => fetchEmployeeAttendance(id),
  });
};
